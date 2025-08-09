import bcrypt from 'bcryptjs';
import User from '../models/User';

export const createDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@path2ivy.com' });
    if (existingUser) {
      console.log('✅ Demo user already exists');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123456', salt);

    // Create demo user
    const demoUser = new User({
      email: 'demo@path2ivy.com',
      password: hashedPassword,
      firstName: 'Alex',
      lastName: 'Demo',
      profile: {
        graduationYear: 2025,
        gpa: 3.85,
        satScore: 1450,
        actScore: 32,
        extracurriculars: ['Student Government', 'Varsity Soccer', 'Debate Team', 'Volunteer Tutor'],
        interests: ['Technology', 'Science', 'Community Service', 'Leadership'],
        careerGoals: 'I want to become a software engineer and eventually start my own tech company focused on educational technology.',
        financialAid: true,
        geographicPreferences: ['West Coast', 'Northeast']
      },
      preferences: {
        collegeTypes: ['Research University', 'Technical Institute'],
        majors: ['Computer Science', 'Engineering', 'Mathematics'],
        preferredSize: 'medium',
        maxTuition: 50000,
        targetColleges: ['Stanford University', 'MIT', 'UC Berkeley']
      },
      progress: {
        tasksCompleted: 23,
        totalTasks: 45,
        lastActivityDate: new Date(),
        achievementBadges: ['Early Bird', 'Essay Expert', 'Research Pro']
      }
    });

    await demoUser.save();
    console.log('✅ Demo user created successfully');
    console.log('📧 Email: demo@path2ivy.com');
    console.log('🔒 Password: demo123456');
  } catch (error) {
    console.error('❌ Error creating demo user:', error);
  }
};



