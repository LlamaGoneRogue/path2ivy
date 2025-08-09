import mongoose, { Document, Schema } from 'mongoose';

export interface ICollege extends Document {
  name: string;
  location: {
    city: string;
    state: string;
    region: string;
  };
  type: 'public' | 'private' | 'community';
  size: 'small' | 'medium' | 'large';
  admissionData: {
    acceptanceRate: number;
    averageGPA: number;
    averageSAT: number;
    averageACT: number;
    applicationDeadlines: {
      regular: Date;
      early: Date;
      earlyAction?: Date;
    };
  };
  academics: {
    majors: string[];
    ranking: number;
    studentFacultyRatio: number;
  };
  financials: {
    tuition: number;
    roomAndBoard: number;
    totalCost: number;
    averageAid: number;
    financialAidRate: number;
  };
  campusLife: {
    setting: 'urban' | 'suburban' | 'rural';
    diversity: number;
    greekLife: boolean;
    athletics: string;
  };
  requirements: {
    essays: string[];
    recommendations: number;
    interviews: boolean;
    portfolios: boolean;
  };
  isSponsored: boolean;
  sponsorshipTier?: 'bronze' | 'silver' | 'gold';
  createdAt: Date;
  updatedAt: Date;
}

const CollegeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    region: { type: String, required: true }
  },
  type: { type: String, enum: ['public', 'private', 'community'], required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
  admissionData: {
    acceptanceRate: { type: Number, required: true, min: 0, max: 100 },
    averageGPA: { type: Number, required: true, min: 0, max: 4.0 },
    averageSAT: { type: Number, min: 400, max: 1600 },
    averageACT: { type: Number, min: 1, max: 36 },
    applicationDeadlines: {
      regular: { type: Date, required: true },
      early: { type: Date },
      earlyAction: { type: Date }
    }
  },
  academics: {
    majors: [{ type: String }],
    ranking: { type: Number },
    studentFacultyRatio: { type: Number }
  },
  financials: {
    tuition: { type: Number, required: true },
    roomAndBoard: { type: Number },
    totalCost: { type: Number },
    averageAid: { type: Number },
    financialAidRate: { type: Number }
  },
  campusLife: {
    setting: { type: String, enum: ['urban', 'suburban', 'rural'] },
    diversity: { type: Number },
    greekLife: { type: Boolean, default: false },
    athletics: { type: String }
  },
  requirements: {
    essays: [{ type: String }],
    recommendations: { type: Number, default: 2 },
    interviews: { type: Boolean, default: false },
    portfolios: { type: Boolean, default: false }
  },
  isSponsored: { type: Boolean, default: false },
  sponsorshipTier: { type: String, enum: ['bronze', 'silver', 'gold'] }
}, {
  timestamps: true
});

export default mongoose.model<ICollege>('College', CollegeSchema);

