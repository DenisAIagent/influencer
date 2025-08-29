import mongoose, { Document, Schema } from 'mongoose';

export interface IAudit extends Document {
  userId: string;
  influencer: {
    platform: 'instagram' | 'tiktok' | 'youtube';
    username: string;
    displayName: string;
    profilePicture: string;
    bio: string;
    verified: boolean;
    url: string;
  };
  metrics: {
    followers: number;
    following: number;
    posts: number;
    avgLikes: number;
    avgComments: number;
    avgViews?: number;
    engagementRate: number;
  };
  qualityAnalysis: {
    overallScore: number;
    authenticityScore: number;
    engagementQuality: number;
    audienceQuality: number;
    redFlags: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
    }>;
  };
  audience?: {
    genderDistribution: {
      male: number;
      female: number;
      other: number;
    };
    ageGroups: Array<{
      range: string;
      percentage: number;
    }>;
    topCountries: Array<{
      country: string;
      percentage: number;
    }>;
  };
   status: 'pending' | 'in_progress' | 'completed' | 'failed';
  error?: string;
  processingTimeMs?: number;
  createdAt: Date;
  completedAt?: Date;
  startedAt?: Date;
}

const auditSchema = new Schema<IAudit>({
  userId: { type: String, required: true, index: true },
  influencer: {
    platform: {
      type: String,
      enum: ["instagram", "tiktok", "youtube"],
      required: true,
    },
    username: { type: String, required: true },
    displayName: String,
    profilePicture: String,
    bio: String,
    verified: { type: Boolean, default: false },
    url: String,
  },
  metrics: {
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    avgLikes: { type: Number, default: 0 },
    avgComments: { type: Number, default: 0 },
    avgViews: Number,
    engagementRate: { type: Number, default: 0 },
  },
  qualityAnalysis: {
    overallScore: { type: Number, min: 0, max: 100, default: 0 },
    authenticityScore: { type: Number, min: 0, max: 100, default: 0 },
    engagementQuality: { type: Number, min: 0, max: 100, default: 0 },
    audienceQuality: { type: Number, min: 0, max: 100, default: 0 },
    redFlags: [
      {
        type: String,
        severity: { type: String, enum: ["low", "medium", "high"] },
        description: String,
      },
    ],
  },
  audience: {
    genderDistribution: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    ageGroups: [
      {
        range: String,
        percentage: Number,
      },
    ],
    topCountries: [
      {
        country: String,
        percentage: Number,
      },
    ],
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "failed"],
    default: "pending",
  },
  error: String,
  processingTimeMs: Number,
  completedAt: Date,
  startedAt: Date,
}, {
  timestamps: true,
});;

export default mongoose.model<IAudit>('Audit', auditSchema);
