import { Queue, Job } from 'bull';
import { redisClient } from '../utils/redis';
import Audit from '../models/Audit';
import { InstagramScraper } from './scraperService';
import logger from '../utils/logger';

// Create a Bull queue for audit jobs
export const auditQueue = new Queue('auditQueue', {
  redis: { url: process.env.REDIS_URL }
});

// Processor function for audits
auditQueue.process(async (job: Job) => {
  const { auditId, platform, username } = job.data;
  try {
    const audit = await Audit.findById(auditId);
    if (!audit) throw new Error('Audit not found');
    if (platform === 'instagram') {
      const scraper = new InstagramScraper();
      const result = await scraper.auditProfile(username);
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
      audit.error = 'Unsupported platform';
      await audit.save();
    }
  } catch (err: any) {
    logger.error('Audit job error', err);
    const audit = await Audit.findById(auditId);
    if (audit) {
      audit.status = 'failed';
      audit.error = err.message;
      await audit.save();
    }
  }
});

// Function to enqueue an audit job
export const enqueueAudit = async (auditId: string, platform: string, username: string) => {
  await auditQueue.add({ auditId, platform, username });
};
