import mongoose, { Document, Schema } from 'mongoose';

export interface IMentor extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  title: string;
  institution: string;
  expertise: string[];
  biography: string;
  experience: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  specializations: string[];
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
  }[];
  achievements: string[];
  languages: string[];
  timezone: string;
  isVerified: boolean;
  isActive: boolean;
  totalSessions: number;
  successStories: number;
  responseTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const MentorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  },
  title: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  expertise: [{
    type: String,
    required: true
  }],
  biography: {
    type: String,
    required: true,
    maxlength: 1000
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  availability: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    timeSlots: [{
      type: String
    }]
  },
  specializations: [{
    type: String,
    enum: [
      'College Admissions',
      'Essay Writing',
      'Interview Prep',
      'STEM Applications',
      'Ivy League',
      'Liberal Arts',
      'Financial Aid',
      'Scholarship Applications',
      'Test Prep',
      'Career Guidance',
      'Study Abroad',
      'Transfer Applications',
      'Graduate School',
      'Medical School',
      'Law School',
      'Business School'
    ]
  }],
  education: [{
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    graduationYear: {
      type: Number,
      required: true
    }
  }],
  achievements: [{
    type: String
  }],
  languages: [{
    type: String,
    default: ['English']
  }],
  timezone: {
    type: String,
    default: 'America/New_York'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  successStories: {
    type: Number,
    default: 0
  },
  responseTime: {
    type: String,
    default: 'Within 24 hours'
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
MentorSchema.index({ specializations: 1 });
MentorSchema.index({ hourlyRate: 1 });
MentorSchema.index({ rating: -1 });
MentorSchema.index({ isActive: 1, isVerified: 1 });

export default mongoose.model<IMentor>('Mentor', MentorSchema);



