import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  role: 'freelancer' | 'agency' | 'brand' | 'influencer';
  subscription: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'canceled' | 'past_due';
    stripeCustomerId?: string;
    subscriptionId?: string;
    currentPeriodEnd?: Date;
  };
  usage: {
    auditsThisMonth: number;
    lastResetDate: Date;
  };
  preferences: {
    defaultPlatform: 'instagram' | 'tiktok' | 'youtube';
    notifications: {
      email: boolean;
      reportReady: boolean;
    };
  };
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  createdAt: Date;
  lastLoginAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: String,
  role: {
    type: String,
    enum: ['freelancer', 'agency', 'brand', 'influencer'],
    default: 'freelancer'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'past_due'],
      default: 'active'
    },
    stripeCustomerId: String,
    subscriptionId: String,
    currentPeriodEnd: Date
  },
  usage: {
    auditsThisMonth: { type: Number, default: 0 },
    lastResetDate: { type: Date, default: Date.now }
  },
  preferences: {
    defaultPlatform: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube'],
      default: 'instagram'
    },
    notifications: {
      email: { type: Boolean, default: true },
      reportReady: { type: Boolean, default: true }
    }
  },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpiry: Date,
  lastLoginAt: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Helper to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
