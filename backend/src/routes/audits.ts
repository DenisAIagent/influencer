import express, { Request, Response } from 'express';
import Audit from '../models/Audit';
import { authMiddleware } from '../middleware/auth';
import { InstagramScraper } from '../services/scraperService';
import User from '../models/User';
// import queue from '../services/queueService'; // commented since we process synchronously for MVP

const router = express.Router();

// GET /audits - list recent audits for authenticated user
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const audits = await Audit.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    return res.json({ audits });
  } catch (err) {
    console.error('List audits error:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération des audits' });
  }
});

// GET /audits/:id - get a specific audit
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const audit = await Audit.findOne({ _id: id, userId });
    if (!audit) {
      return res.status(404).json({ error: 'Audit non trouvé' });
    }
    return res.json({ audit });
  } catch (err) {
    console.error('Get audit error:', err);
    return res.status(500).json({ error: 'Erreur lors de la récupération de l\'audit' });
  }
});

// POST /audits - create a new audit (synchronous scraping for MVP)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { platform, username } = req.body;
    if (!platform || !username) {
      return res.status(400).json({ error: 'Plateforme et nom d\'utilisateur requis' });
    }
    // check user usage limits
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }
    // Determine plan limits
    const limits: Record<string, number | undefined> = {
      free: 50,
      starter: 500,
      pro: 2000,
      enterprise: undefined
    };
    const plan = user.subscription?.plan || 'free';
    const max = limits[plan];
    if (max !== undefined && user.usage.auditsThisMonth >= max) {
      return res.status(403).json({ error: 'Limite d\'audits atteinte pour ce mois' });
    }
    // Create audit entry with status pending
    const audit = new Audit({
      userId,
      influencer: {
        platform,
        username,
        displayName: '',
        profilePicture: '',
        bio: '',
        verified: false,
        url: ''
      },
      metrics: {
        followers: 0,
        following: 0,
        posts: 0,
        avgLikes: 0,
        avgComments: 0,
        engagementRate: 0
      },
      qualityAnalysis: {
        overallScore: 0,
        authenticityScore: 0,
        engagementQuality: 0,
        audienceQuality: 0,
        redFlags: []
      },
      status: 'pending'
    });
    await audit.save();
    // Update user usage
    user.usage.auditsThisMonth += 1;
    await user.save();
    // For MVP, synchronously perform Instagram scraping if platform is instagram
    try {
      if (platform === 'instagram') {
        const scraper = new InstagramScraper();
        const result = await scraper.auditProfile(username);
        // update audit with scraped data
        audit.influencer = result.influencer as any;
        audit.metrics = result.metrics as any;
        audit.qualityAnalysis = result.qualityAnalysis as any;
        audit.audience = result.audience;
        audit.status = 'completed';
        audit.completedAt = new Date();
        await audit.save();
        await scraper.close();
      } else {
        audit.status = 'failed';
        audit.error = 'Scraping non implémenté pour cette plateforme';
        await audit.save();
      }
    } catch (error: any) {
      console.error('Scraping error:', error);
      audit.status = 'failed';
      audit.error = error.message || 'Erreur d\'audit';
      await audit.save();
    }
    return res.status(201).json({ audit });
  } catch (err) {
    console.error('Create audit error:', err);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'audit' });
  }
});

export default router;
