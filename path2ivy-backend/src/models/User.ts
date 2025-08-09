import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profile: {
    graduationYear: number;
    gpa: number;
    satScore?: number;
    actScore?: number;
    extracurriculars: string[];
    interests: string[];
    careerGoals: string;
    financialAid: boolean;
    geographicPreferences: string[];
    specialCircumstances?: string;
  };
  preferences: {
    collegeTypes: string[];
    majors: string[];
    maxTuition?: number;
    preferredSize: string;
    targetColleges: string[];
  };
  progress: {
    tasksCompleted: number;
    totalTasks: number;
    lastActivityDate: Date;
    achievementBadges: string[];
  };
  subscription: {
    tier: 'free' | 'premium';
    expiresAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profile: {
    graduationYear: { type: Number, required: true },
    gpa: { type: Number, required: true, min: 0, max: 4.0 },
    satScore: { type: Number, min: 400, max: 1600 },
    actScore: { type: Number, min: 1, max: 36 },
    extracurriculars: [{ type: String }],
    interests: [{ type: String }],
    careerGoals: { type: String },
    financialAid: { type: Boolean, default: false },
    geographicPreferences: [{ type: String }],
    specialCircumstances: { type: String }
  },
  preferences: {
    collegeTypes: [{ type: String }],
    majors: [{ type: String }],
    maxTuition: { type: Number },
    preferredSize: { type: String, enum: ['small', 'medium', 'large'] },
    targetColleges: [{ type: String }]
  },
  progress: {
    tasksCompleted: { type: Number, default: 0 },
    totalTasks: { type: Number, default: 0 },
    lastActivityDate: { type: Date, default: Date.now },
    achievementBadges: [{ type: String }]
  },
  subscription: {
    tier: { type: String, enum: ['free', 'premium'], default: 'free' },
    expiresAt: { type: Date }
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);

