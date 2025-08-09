import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  _id: string;
  userId: string;
  mentorId: string;
  sessionType: 'consultation' | 'essay-review' | 'interview-prep' | 'strategy-session' | 'follow-up';
  scheduledDate: Date;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  amount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  sessionNotes?: string;
  studentGoals: string;
  mentorNotes?: string;
  rating?: number;
  review?: string;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  sessionType: {
    type: String,
    enum: ['consultation', 'essay-review', 'interview-prep', 'strategy-session', 'follow-up'],
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 60,
    min: 15,
    max: 180
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  sessionNotes: {
    type: String,
    maxlength: 2000
  },
  studentGoals: {
    type: String,
    required: true,
    maxlength: 1000
  },
  mentorNotes: {
    type: String,
    maxlength: 1000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: 500
  },
  meetingLink: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
BookingSchema.index({ userId: 1 });
BookingSchema.index({ mentorId: 1 });
BookingSchema.index({ scheduledDate: 1 });
BookingSchema.index({ status: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);



