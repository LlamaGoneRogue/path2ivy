import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import collegeRoutes from './routes/colleges';
import actionPlanRoutes from './routes/actionPlans';
import aiRoutes from './routes/ai';

// Load environment variables (works in src and dist)
const envPath = path.resolve(__dirname, '..', 'development.env');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://path2ivy.com', 'https://www.path2ivy.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Path2Ivy API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/action-plans', actionPlanRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mentors', require('./routes/mentors').default);
app.use('/api/scholarships', require('./routes/scholarships').default);
app.use('/api/tracker', require('./routes/tracker').default);
app.use('/api/tools', require('./routes/tools').default);
app.use('/api/agent', require('./routes/agent').default);

// Server-Sent Events (SSE) for lightweight real-time updates
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // Allow CORS for SSE as well
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
    ? '*'
    : '*');

  // Initial ping
  res.write(`event: ping\n`);
  res.write(`data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);

  const intervalId = setInterval(() => {
    const payload = { time: new Date().toISOString(), type: 'heartbeat' };
    res.write(`event: ping\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 15000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Import seed functions
import { seedColleges } from './utils/seedData';
import { createDemoUser } from './utils/createDemoUser';

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/path2ivy',
      {
        serverSelectionTimeoutMS: 2000,
      } as any
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed sample data
    await seedColleges();
    await createDemoUser();
    
    // Import and seed mentors
    const { seedMentors } = await import('./utils/seedMentors');
    await seedMentors();
  } catch (error) {
    console.warn('⚠️ MongoDB not available, running in demo mode without database');
    console.log('📱 Frontend will work with mock data');
    // Don't exit, continue without database for demo purposes
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Path2Ivy API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS enabled for: ${process.env.NODE_ENV === 'production' ? 'production domains' : 'localhost:3000'}`);
  });
};

startServer();

export default app;
