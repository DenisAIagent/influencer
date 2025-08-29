import express, { Request, Response } from 'express';
import Audit from '../models/Audit';
import { authMiddleware } from '../middleware/auth';
import User from '../models/User';
import QueueService from '../services/queueService';
import logger from '../utils/logger';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware pour les audits
const auditValidation = [
  body('platform')
    .isIn(['instagram', 'tiktok', 'youtube'])
    .withMessage('Platform must be instagram, tiktok, or youtube'),
  body('username')
    .isLength({ min: 1, max: 50 })
    .withMessage('Username must be between 1 and 50 characters')
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage('Username contains invalid characters'),
];

// GET /audits - list recent audits for authenticated user with pagination
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50); // Max 50 items
    const skip = (page - 1) * limit;
    
    // Filtres optionnels
    const platform = req.query.platform as string;
    const status = req.query.status as string;
    
    const filter: any = { userId };
    if (platform) filter['influencer.platform'] = platform;
    if (status) filter.status = status;

    const [audits, total] = await Promise.all([
      Audit.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v'), // Exclure le champ de version
      Audit.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      audits,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (err: any) {
    logger.error('List audits error:', {
      error: err.message,
      userId: (req as any).user?.id,
    });
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération des audits',
      code: 'FETCH_AUDITS_ERROR'
    });
  }
});

// GET /audits/:id - get a specific audit
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    // Validation de l'ID MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        error: 'ID d\'audit invalide',
        code: 'INVALID_AUDIT_ID'
      });
    }

    const audit = await Audit.findOne({ _id: id, userId }).select('-__v');
    
    if (!audit) {
      return res.status(404).json({ 
        error: 'Audit non trouvé',
        code: 'AUDIT_NOT_FOUND'
      });
    }

    return res.json({ audit });
  } catch (err: any) {
    logger.error('Get audit error:', {
      error: err.message,
      auditId: req.params.id,
      userId: (req as any).user?.id,
    });
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération de l\'audit',
      code: 'FETCH_AUDIT_ERROR'
    });
  }
});

// GET /audits/:id/status - get audit status only (lightweight endpoint)
router.get('/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        error: 'ID d\'audit invalide',
        code: 'INVALID_AUDIT_ID'
      });
    }

    const audit = await Audit.findOne({ _id: id, userId })
      .select('status createdAt startedAt completedAt error')
      .lean();
    
    if (!audit) {
      return res.status(404).json({ 
        error: 'Audit non trouvé',
        code: 'AUDIT_NOT_FOUND'
      });
    }

    return res.json({ 
      id: audit._id,
      status: audit.status,
      createdAt: audit.createdAt,
      startedAt: audit.startedAt,
      completedAt: audit.completedAt,
      error: audit.error,
    });
  } catch (err: any) {
    logger.error('Get audit status error:', {
      error: err.message,
      auditId: req.params.id,
      userId: (req as any).user?.id,
    });
    return res.status(500).json({ 
      error: 'Erreur lors de la récupération du statut',
      code: 'FETCH_STATUS_ERROR'
    });
  }
});

// POST /audits - create a new audit (asynchronous processing)
router.post('/', authMiddleware, auditValidation, async (req: Request, res: Response) => {
  try {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Données invalides',
        code: 'VALIDATION_ERROR',
        details: errors.array(),
      });
    }

    const userId = (req as any).user.id;
    const { platform, username } = req.body;

    logger.info('New audit request', {
      userId,
      platform,
      username,
    });

    // Vérifier l'utilisateur et ses limites
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ 
        error: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }

    // Déterminer les limites selon le plan
    const limits: Record<string, number | undefined> = {
      free: 50,
      starter: 500,
      pro: 2000,
      enterprise: undefined, // Illimité
    };

    const plan = user.subscription?.plan || 'free';
    const maxAudits = limits[plan];

    if (maxAudits !== undefined && user.usage.auditsThisMonth >= maxAudits) {
      return res.status(403).json({ 
        error: 'Limite d\'audits atteinte pour ce mois',
        code: 'AUDIT_LIMIT_REACHED',
        details: {
          current: user.usage.auditsThisMonth,
          limit: maxAudits,
          plan,
        },
      });
    }

    // Vérifier s'il n'y a pas déjà un audit en cours pour ce profil
    const existingAudit = await Audit.findOne({
      userId,
      'influencer.platform': platform,
      'influencer.username': username,
      status: { $in: ['pending', 'in_progress'] },
    });

    if (existingAudit) {
      return res.status(409).json({
        error: 'Un audit est déjà en cours pour ce profil',
        code: 'AUDIT_IN_PROGRESS',
        auditId: existingAudit._id,
      });
    }

    // Créer l'entrée d'audit avec statut pending
    const audit = new Audit({
      userId,
      influencer: {
        platform,
        username,
        displayName: '',
        profilePicture: '',
        bio: '',
        verified: false,
        url: `https://${platform}.com/${username}`,
      },
      metrics: {
        followers: 0,
        following: 0,
        posts: 0,
        avgLikes: 0,
        avgComments: 0,
        engagementRate: 0,
      },
      qualityAnalysis: {
        overallScore: 0,
        authenticityScore: 0,
        engagementQuality: 0,
        audienceQuality: 0,
        redFlags: [],
      },
      status: 'pending',
    });

    await audit.save();

    // Mettre à jour l'usage de l'utilisateur
    user.usage.auditsThisMonth += 1;
    await user.save();

    // Ajouter le job à la file d'attente
    try {
      const isPremium = ['pro', 'enterprise'].includes(plan);
      
      if (isPremium) {
        await QueueService.addPriorityAuditJob({
          auditId: audit._id.toString(),
          platform,
          username,
          userId,
        });
      } else {
        await QueueService.addAuditJob({
          auditId: audit._id.toString(),
          platform,
          username,
          userId,
        });
      }

      logger.info('Audit job queued successfully', {
        auditId: audit._id,
        userId,
        platform,
        username,
        isPremium,
      });

    } catch (queueError: any) {
      logger.error('Failed to queue audit job', {
        error: queueError.message,
        auditId: audit._id,
      });

      // Marquer l'audit comme échoué
      audit.status = 'failed';
      audit.error = 'Erreur lors de la mise en file d\'attente';
      await audit.save();

      return res.status(500).json({
        error: 'Erreur lors de la mise en file d\'attente de l\'audit',
        code: 'QUEUE_ERROR',
      });
    }

    // Répondre immédiatement avec l'audit créé (statut 202 Accepted)
    return res.status(202).json({
      message: 'Audit en cours de traitement',
      audit: {
        id: audit._id,
        status: audit.status,
        platform: audit.influencer.platform,
        username: audit.influencer.username,
        createdAt: audit.createdAt,
      },
    });

  } catch (err: any) {
    logger.error('Create audit error:', {
      error: err.message,
      stack: err.stack,
      userId: (req as any).user?.id,
      body: req.body,
    });
    return res.status(500).json({ 
      error: 'Erreur lors de la création de l\'audit',
      code: 'CREATE_AUDIT_ERROR'
    });
  }
});

// GET /audits/stats/queue - get queue statistics (admin only)
router.get('/stats/queue', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    // Vérifier si l'utilisateur est admin (vous devrez adapter selon votre système)
    if (user.role !== 'admin') {
      return res.status(403).json({
        error: 'Accès non autorisé',
        code: 'UNAUTHORIZED_ACCESS',
      });
    }

    const stats = await QueueService.getQueueStats();
    return res.json({ stats });

  } catch (err: any) {
    logger.error('Get queue stats error:', {
      error: err.message,
      userId: (req as any).user?.id,
    });
    return res.status(500).json({
      error: 'Erreur lors de la récupération des statistiques',
      code: 'QUEUE_STATS_ERROR',
    });
  }
});

export default router;
