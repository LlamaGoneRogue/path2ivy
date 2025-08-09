import mongoose, { Document, Schema } from 'mongoose';

export interface IActionPlan extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  tasks: {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'extracurricular' | 'essays' | 'applications' | 'financial' | 'test-prep';
    priority: 'high' | 'medium' | 'low';
    estimatedTime: number; // in minutes
    completed: boolean;
    completedAt?: Date;
    aiGenerated: boolean;
  }[];
  insights: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
  collegeSpotlight?: {
    collegeId: mongoose.Types.ObjectId;
    reason: string;
    sponsored: boolean;
  };
  scholarshipOpportunities: {
    name: string;
    amount: number;
    deadline: Date;
    eligibilityMatch: number; // percentage match
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ActionPlanSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  tasks: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['academic', 'extracurricular', 'essays', 'applications', 'financial', 'test-prep'],
      required: true 
    },
    priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
    estimatedTime: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    aiGenerated: { type: Boolean, default: true }
  }],
  insights: {
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    recommendations: [{ type: String }]
  },
  collegeSpotlight: {
    collegeId: { type: Schema.Types.ObjectId, ref: 'College' },
    reason: { type: String },
    sponsored: { type: Boolean, default: false }
  },
  scholarshipOpportunities: [{
    name: { type: String },
    amount: { type: Number },
    deadline: { type: Date },
    eligibilityMatch: { type: Number, min: 0, max: 100 },
    url: { type: String }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
ActionPlanSchema.index({ userId: 1, date: -1 });

export default mongoose.model<IActionPlan>('ActionPlan', ActionPlanSchema);

