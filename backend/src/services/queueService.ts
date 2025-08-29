import Queue from 'bull';
import Redis from 'ioredis';
import Audit from '../models/Audit';
import { InstagramScraper } from './scraperService';
import logger from '../utils/logger';

// Configuration Redis améliorée
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

// Interface pour les données d'audit
export interface AuditJobData {
  auditId: string;
  platform: string;
  username: string;
  userId: string;
}

// Créer la file d'attente pour les audits avec configuration robuste
export const auditQueue = new Queue('audit processing', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 100, // Garder les 100 derniers jobs complétés
    removeOnFail: 50,      // Garder les 50 derniers jobs échoués
    attempts: 3,           // Nombre de tentatives en cas d'échec
    backoff: {
      type: 'exponential',
      delay: 2000,         // Délai initial de 2 secondes
    },
  },
});

// Processeur pour les jobs d'audit avec gestion d'erreurs améliorée
auditQueue.process('process-audit', async (job) => {
  const { auditId, platform, username, userId } = job.data;
  
  logger.info(`Starting audit processing`, {
    jobId: job.id,
    auditId,
    platform,
    username,
    userId,
  });

  try {
    // Récupérer l'audit depuis la base de données
    const audit = await Audit.findById(auditId);
    if (!audit) {
      throw new Error(`Audit not found: ${auditId}`);
    }

    // Mettre à jour le statut à "en cours"
    aaudit.status = 'in_progress';
    audit.startedAt = new Date();
    await audit.save();

    // Traitement selon la plateforme
    if (platform === 'instagram') {
      const scraper = new InstagramScraper();
      
      try {
        const result = await scraper.auditProfile(username);
        
        // Mettre à jour l'audit avec les résultats
        audit.influencer = result.influencer as any;
        audit.metrics = result.metrics as any;
        audit.qualityAnalysis = result.qualityAnalysis as any;
        audit.audience = result.audience;
        audit.status = 'completed';
        audit.completedAt = new Date();
        
        await audit.save();
        
        logger.info(`Audit completed successfully`, {
          jobId: job.id,
          auditId,
          overallScore: result.qualityAnalysis?.overallScore,
        });
        
      } finally {
        await scraper.close();
      }
      
    } else {
      // Plateforme non supportée
      audit.status = 'failed';
      audit.error = `Platform not supported: ${platform}`;
      audit.completedAt = new Date();
      await audit.save();
      
      throw new Error(`Unsupported platform: ${platform}`);
    }

  } catch (error: any) {
    logger.error(`Audit job failed`, {
      jobId: job.id,
      auditId,
      error: error.message,
      stack: error.stack,
    });

    // Mettre à jour l'audit avec l'erreur
    try {
      const audit = await Audit.findById(auditId);
      if (audit) {
        audit.status = 'failed';
        audit.error = error.message || 'Unknown error occurred';
        audit.completedAt = new Date();
        await audit.save();
      }
    } catch (updateError: any) {
      logger.error(`Failed to update audit status after error`, {
        auditId,
        updateError: updateError.message,
      });
    }

    throw error; // Re-throw pour que Bull puisse gérer les retries
  }
});

// Service de gestion de la file d'attente
export class QueueService {
  /**
   * Ajouter un job d'audit à la file d'attente
   */
  static async addAuditJob(data: AuditJobData): Promise<void> {
    try {
      const job = await auditQueue.add('process-audit', data, {
        priority: 1, // Priorité normale
        delay: 0,    // Pas de délai
      });
      
      logger.info(`Audit job added to queue`, {
        jobId: job.id,
        auditId: data.auditId,
        platform: data.platform,
        username: data.username,
      });
    } catch (error: any) {
      logger.error('Failed to add audit job to queue', {
        error: error.message,
        auditId: data.auditId,
      });
      throw error;
    }
  }

  /**
   * Ajouter un job d'audit prioritaire (pour les utilisateurs premium)
   */
  static async addPriorityAuditJob(data: AuditJobData): Promise<void> {
    try {
      const job = await auditQueue.add('process-audit', data, {
        priority: 10, // Priorité élevée
        delay: 0,
      });
      
      logger.info(`Priority audit job added to queue`, {
        jobId: job.id,
        auditId: data.auditId,
        platform: data.platform,
        username: data.username,
      });
    } catch (error: any) {
      logger.error('Failed to add priority audit job to queue', {
        error: error.message,
        auditId: data.auditId,
      });
      throw error;
    }
  }

  /**
   * Obtenir les statistiques de la file d'attente
   */
  static async getQueueStats() {
    try {
      const waiting = await auditQueue.getWaiting();
      const active = await auditQueue.getActive();
      const completed = await auditQueue.getCompleted();
      const failed = await auditQueue.getFailed();

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
      };
    } catch (error: any) {
      logger.error('Failed to get queue stats', { error: error.message });
      throw error;
    }
  }

  /**
   * Nettoyer les anciens jobs
   */
  static async cleanQueue(): Promise<void> {
    try {
      // Nettoyer les jobs complétés de plus de 24h
      await auditQueue.clean(24 * 60 * 60 * 1000, 'completed');
      // Nettoyer les jobs échoués de plus de 7 jours
      await auditQueue.clean(7 * 24 * 60 * 60 * 1000, 'failed');
      
      logger.info('Queue cleaned successfully');
    } catch (error: any) {
      logger.error('Failed to clean queue', { error: error.message });
      throw error;
    }
  }
}

// Fonction legacy pour compatibilité
export const enqueueAudit = async (auditId: string, platform: string, username: string, userId?: string) => {
  await QueueService.addAuditJob({
    auditId,
    platform,
    username,
    userId: userId || 'unknown',
  });
};

// Gestion des événements de la file d'attente
auditQueue.on('completed', (job, result) => {
  logger.info(`Audit job completed`, {
    jobId: job.id,
    auditId: job.data.auditId,
    duration: Date.now() - job.timestamp,
  });
});

auditQueue.on('failed', (job, err) => {
  logger.error(`Audit job failed`, {
    jobId: job.id,
    auditId: job.data.auditId,
    error: err.message,
    attempts: job.attemptsMade,
  });
});

auditQueue.on('stalled', (job) => {
  logger.warn(`Audit job stalled`, {
    jobId: job.id,
    auditId: job.data.auditId,
  });
});

export default QueueService;
