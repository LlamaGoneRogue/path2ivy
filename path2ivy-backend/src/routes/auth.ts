import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, profile, preferences } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profile: profile || {
        graduationYear: new Date().getFullYear() + 1,
        gpa: 0,
        extracurriculars: [],
        interests: [],
        careerGoals: '',
        financialAid: false,
        geographicPreferences: []
      },
      preferences: preferences || {
        collegeTypes: [],
        majors: [],
        preferredSize: 'medium',
        targetColleges: []
      }
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profile: user.profile,
      preferences: user.preferences,
      progress: user.progress,
      subscription: user.subscription
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Demo mode: Check for demo account
    if (email === 'demo@path2ivy.com' && password === 'demo123456') {
      const token = jwt.sign(
        { userId: 'demo-user-id' },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      const demoUser = {
        _id: 'demo-user-id',
        email: 'demo@path2ivy.com',
        firstName: 'Alex',
        lastName: 'Demo',
        profile: {
          graduationYear: 2025,
          gpa: 3.85,
          satScore: 1450,
          actScore: 32,
          extracurriculars: ['Student Government', 'Varsity Soccer', 'Debate Team'],
          interests: ['Technology', 'Science', 'Community Service'],
          careerGoals: 'Software engineer and tech entrepreneur',
          financialAid: true,
          geographicPreferences: ['West Coast', 'Northeast']
        },
        preferences: {
          collegeTypes: ['Research University', 'Technical Institute'],
          majors: ['Computer Science', 'Engineering'],
          preferredSize: 'medium',
          maxTuition: 50000,
          targetColleges: ['Stanford', 'MIT', 'UC Berkeley']
        },
        progress: {
          tasksCompleted: 23,
          totalTasks: 45,
          lastActivityDate: new Date(),
          achievementBadges: ['Early Bird', 'Essay Expert', 'Research Pro']
        },
        subscription: { tier: 'free' }
      };

      return res.json({
        message: 'Login successful (Demo Mode)',
        token,
        user: demoUser
      });
    }

    // Try database if available
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      user.progress.lastActivityDate = new Date();
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      const userResponse = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profile: user.profile,
        preferences: user.preferences,
        progress: user.progress,
        subscription: user.subscription
      };

      res.json({
        message: 'Login successful',
        token,
        user: userResponse
      });
    } catch (dbError) {
      // Database not available, return demo mode message
      return res.status(400).json({ 
        message: 'Demo mode: Use demo@path2ivy.com / demo123456' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById((req as any).user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
});

// Logout (client-side token removal, but we can add token blacklisting later)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logout successful' });
});

export default router;
