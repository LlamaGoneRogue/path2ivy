import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    // Mock user data for demo
    const user = {
      id: '1',
      email: 'demo@path2ivy.com',
      name: 'Demo User',
      profile: {
        gpa: 3.8,
        satScore: 1400,
        actScore: 30,
        familyIncome: 75000,
        state: 'CA',
        ethnicity: 'Asian',
        firstGen: false,
        intendedMajor: ['Computer Science', 'Engineering'],
        leadershipRoles: ['Student Council President'],
        communityService: 150,
        researchExperience: true,
        internshipExperience: false,
        awards: ['National Merit Scholar'],
        extracurriculars: ['Robotics Club', 'Debate Team']
      }
    };
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { profile } = req.body;
    
    // Mock update response
    res.json({ 
      message: 'Profile updated successfully',
      profile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get user preferences
router.get('/preferences', async (req, res) => {
  try {
    const preferences = {
      targetColleges: ['UC Berkeley', 'Stanford', 'MIT'],
      preferredSpecializations: ['College Admissions', 'Essay Writing'],
      budget: 50000,
      location: 'West Coast',
      size: 'large',
      type: 'both'
    };
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching preferences' });
  }
});

// Update user preferences
router.put('/preferences', async (req, res) => {
  try {
    const preferences = req.body;
    
    res.json({ 
      message: 'Preferences updated successfully',
      preferences 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences' });
  }
});

export default router;

