import express from 'express';
import Mentor from '../models/Mentor';
import Booking from '../models/Booking';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Mock mentor data for demo mode
const mockMentors = [
  {
    _id: 'mentor-1',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@example.com',
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: 'Former Harvard Admissions Officer',
    institution: 'Harvard University',
    expertise: ['College Admissions', 'Essay Writing', 'Ivy League'],
    biography: 'Former admissions officer at Harvard with 8 years of experience. Helped over 500 students get accepted to top-tier universities.',
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
    },
    specializations: ['College Admissions', 'Essay Writing', 'Ivy League', 'Interview Prep'],
    education: [
      {
        degree: 'M.Ed in Higher Education',
        institution: 'Harvard Graduate School of Education',
        graduationYear: 2015
      }
    ],
    achievements: ['500+ successful admissions to top universities'],
    languages: ['English', 'Mandarin'],
    timezone: 'America/New_York',
    isVerified: true,
    isActive: true,
    totalSessions: 340,
    successStories: 287,
    responseTime: 'Within 6 hours'
  },
  {
    _id: 'mentor-2',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    email: 'michael.rodriguez@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    title: 'MIT Alumni & STEM Specialist',
    institution: 'Massachusetts Institute of Technology',
    expertise: ['STEM Applications', 'Test Prep', 'Engineering'],
    biography: 'MIT graduate with extensive experience in STEM education and admissions.',
    experience: 6,
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 120,
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
      timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 AM', '10:00 AM']
    },
    specializations: ['STEM Applications', 'Test Prep', 'Career Guidance'],
    education: [
      {
        degree: 'M.S. in Computer Science',
        institution: 'Massachusetts Institute of Technology',
        graduationYear: 2018
      }
    ],
    achievements: ['Led 200+ students to STEM program acceptances'],
    languages: ['English', 'Spanish'],
    timezone: 'America/Los_Angeles',
    isVerified: true,
    isActive: true,
    totalSessions: 156,
    successStories: 134,
    responseTime: 'Within 12 hours'
  },
  {
    _id: 'mentor-3',
    firstName: 'Dr. Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    profileImage: 'https://randomuser.me/api/portraits/women/47.jpg',
    title: 'Medical School Advisor',
    institution: 'Johns Hopkins University',
    expertise: ['Medical School', 'Pre-Med Guidance', 'Research'],
    biography: 'Practicing physician and former medical school admissions committee member.',
    experience: 12,
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 180,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 AM', '9:00 AM']
    },
    specializations: ['Medical School', 'STEM Applications', 'Research'],
    education: [
      {
        degree: 'M.D.',
        institution: 'Johns Hopkins School of Medicine',
        graduationYear: 2012
      }
    ],
    achievements: ['95% medical school acceptance rate for mentees'],
    languages: ['English', 'Hindi'],
    timezone: 'America/New_York',
    isVerified: true,
    isActive: true,
    totalSessions: 298,
    successStories: 267,
    responseTime: 'Within 8 hours'
  },
  {
    _id: 'mentor-4',
    firstName: 'James',
    lastName: 'Thompson',
    email: 'james.thompson@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/51.jpg',
    title: 'Financial Aid Specialist',
    institution: 'Princeton University',
    expertise: ['Financial Aid', 'Scholarship Applications', 'Need-Based Aid'],
    biography: 'Former financial aid director with 15 years of experience helping families navigate college funding.',
    experience: 15,
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 100,
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      timeSlots: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
    },
    specializations: ['Financial Aid', 'Scholarship Applications', 'College Admissions'],
    education: [
      { degree: 'M.A. in Education Policy', institution: 'Princeton University', graduationYear: 2009 }
    ],
    achievements: ['Secured $50M+ in financial aid for students'],
    languages: ['English'],
    timezone: 'America/New_York',
    isVerified: true,
    isActive: true,
    totalSessions: 487,
    successStories: 445,
    responseTime: 'Within 4 hours'
  },
  {
    _id: 'mentor-5',
    firstName: 'Dr. Emily',
    lastName: 'Foster',
    email: 'emily.foster@example.com',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
    title: 'Liberal Arts Counselor',
    institution: 'Williams College',
    expertise: ['Liberal Arts', 'Essay Writing', 'Creative Applications'],
    biography: 'English professor and former admissions counselor specializing in liberal arts applications.',
    experience: 10,
    rating: 4.8,
    reviewCount: 142,
    hourlyRate: 130,
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      timeSlots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM']
    },
    specializations: ['Liberal Arts', 'Essay Writing', 'Creative Applications', 'Interview Prep'],
    education: [
      { degree: 'Ph.D. in English Literature', institution: 'Columbia University', graduationYear: 2014 }
    ],
    achievements: ['Published novelist and poet'],
    languages: ['English', 'French'],
    timezone: 'America/New_York',
    isVerified: true,
    isActive: true,
    totalSessions: 234,
    successStories: 201,
    responseTime: 'Within 24 hours'
  },
  {
    _id: 'mentor-6',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/60.jpg',
    title: 'Business School Advisor',
    institution: 'Wharton School, University of Pennsylvania',
    expertise: ['Business School', 'MBA Applications', 'Leadership'],
    biography: 'MBA from Wharton and successful entrepreneur. Specializes in business school applications and career strategy.',
    experience: 7,
    rating: 4.9,
    reviewCount: 98,
    hourlyRate: 160,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      timeSlots: ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 AM', '11:00 AM']
    },
    specializations: ['Business School', 'Career Guidance', 'Leadership', 'Entrepreneurship'],
    education: [
      { degree: 'MBA', institution: 'Wharton School, University of Pennsylvania', graduationYear: 2017 }
    ],
    achievements: ['Founded two successful startups'],
    languages: ['English', 'Korean'],
    timezone: 'America/Los_Angeles',
    isVerified: true,
    isActive: true,
    totalSessions: 167,
    successStories: 143,
    responseTime: 'Within 6 hours'
  },
  {
    _id: 'mentor-7',
    firstName: 'Aisha',
    lastName: 'Khan',
    email: 'aisha.khan@example.com',
    profileImage: 'https://randomuser.me/api/portraits/women/83.jpg',
    title: 'Essay Coach & Narrative Strategist',
    institution: 'Independent',
    expertise: ['Essay Writing', 'Narrative Building', 'Scholarship Applications'],
    biography: 'Essay specialist who has helped students craft winning narratives for Ivy League applications.',
    experience: 9,
    rating: 4.7,
    reviewCount: 76,
    hourlyRate: 110,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      timeSlots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']
    },
    specializations: ['Essay Writing', 'Ivy League', 'Scholarship Applications'],
    education: [
      { degree: 'MFA in Creative Writing', institution: 'NYU', graduationYear: 2016 }
    ],
    achievements: ['Winner of multiple national writing awards'],
    languages: ['English', 'Urdu'],
    timezone: 'America/New_York',
    isVerified: true,
    isActive: true,
    totalSessions: 192,
    successStories: 150,
    responseTime: 'Within 8 hours'
  },
  {
    _id: 'mentor-8',
    firstName: 'Robert',
    lastName: 'Lee',
    email: 'robert.lee@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    title: 'Interview Prep Coach',
    institution: 'Stanford Alumni',
    expertise: ['Interview Prep', 'Communication', 'Leadership'],
    biography: 'Former admissions interviewer with a focus on authentic storytelling and communication skills.',
    experience: 11,
    rating: 4.8,
    reviewCount: 121,
    hourlyRate: 140,
    availability: {
      days: ['Wednesday', 'Thursday', 'Sunday'],
      timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM']
    },
    specializations: ['Interview Prep', 'Leadership', 'College Admissions'],
    education: [
      { degree: 'B.S. in Management Science', institution: 'Stanford University', graduationYear: 2010 }
    ],
    achievements: ['Coached 300+ successful interviews'],
    languages: ['English'],
    timezone: 'America/Los_Angeles',
    isVerified: true,
    isActive: true,
    totalSessions: 289,
    successStories: 230,
    responseTime: 'Within 12 hours'
  }
];

// Get all mentors with filters and search
router.get('/', async (req, res) => {
  try {
    const {
      search,
      specialization,
      maxRate,
      minRating,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Demo mode: return mock data with pagination
    try {
      const mentorCount = await Mentor.countDocuments();
      if (mentorCount === 0) {
        throw new Error('No database connection');
      }
    } catch (dbError) {
      // Return filtered mock data
      let filteredMentors = [...mockMentors];

      // Apply filters
      if (search) {
        const searchTerm = search.toString().toLowerCase();
        filteredMentors = filteredMentors.filter(mentor =>
          mentor.firstName.toLowerCase().includes(searchTerm) ||
          mentor.lastName.toLowerCase().includes(searchTerm) ||
          mentor.title.toLowerCase().includes(searchTerm) ||
          mentor.institution.toLowerCase().includes(searchTerm) ||
          mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm))
        );
      }

      if (specialization) {
        filteredMentors = filteredMentors.filter(mentor =>
          mentor.specializations.includes(specialization.toString())
        );
      }

      if (maxRate) {
        filteredMentors = filteredMentors.filter(mentor =>
          mentor.hourlyRate <= parseInt(maxRate.toString())
        );
      }

      if (minRating) {
        filteredMentors = filteredMentors.filter(mentor =>
          mentor.rating >= parseFloat(minRating.toString())
        );
      }

      // Sort mentors
      filteredMentors.sort((a, b) => {
        const order = sortOrder === 'desc' ? -1 : 1;
        switch (sortBy) {
          case 'rating':
            return order * (a.rating - b.rating);
          case 'price':
            return order * (a.hourlyRate - b.hourlyRate);
          case 'experience':
            return order * (a.experience - b.experience);
          default:
            return order * (a.rating - b.rating);
        }
      });

      const pageNum = parseInt(page?.toString() || '1');
      const limitNum = parseInt(limit?.toString() || '6');
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;
      const paged = filteredMentors.slice(start, end);

      return res.json({
        mentors: paged,
        totalCount: filteredMentors.length,
        currentPage: pageNum,
        totalPages: Math.ceil(filteredMentors.length / limitNum)
      });
    }

    // Database query logic here for production
    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;

    let query: any = { isActive: true, isVerified: true };
    let sort: any = {};

    // Build query
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { institution: { $regex: search, $options: 'i' } },
        { expertise: { $in: [new RegExp(search.toString(), 'i')] } }
      ];
    }

    if (specialization) {
      query.specializations = specialization;
    }

    if (maxRate) {
      query.hourlyRate = { $lte: parseInt(maxRate.toString()) };
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating.toString()) };
    }

    // Build sort
    const order = sortOrder === 'desc' ? -1 : 1;
    switch (sortBy) {
      case 'rating':
        sort.rating = order;
        break;
      case 'price':
        sort.hourlyRate = order;
        break;
      case 'experience':
        sort.experience = order;
        break;
      default:
        sort.rating = -1;
    }

    const mentors = await Mentor.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const totalCount = await Mentor.countDocuments(query);

    res.json({
      mentors,
      totalCount,
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum)
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Server error fetching mentors' });
  }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Demo mode: return mock data
    try {
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        throw new Error('Mentor not found in database');
      }
      res.json(mentor);
    } catch (dbError) {
      const mockMentor = mockMentors.find(m => m._id === id);
      if (!mockMentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
      res.json(mockMentor);
    }
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ message: 'Server error fetching mentor' });
  }
});

// Get mentor availability slots
router.get('/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // Demo mode: return mock availability
    const mockAvailability = [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: false }
    ];

    res.json({ availability: mockAvailability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Server error fetching availability' });
  }
});

// Book a session with mentor (requires authentication)
router.post('/:id/book', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sessionType,
      scheduledDate,
      duration,
      studentGoals
    } = req.body;

    const userId = (req as any).user?.userId || 'demo-user-id';

    // Demo mode: create mock booking
    const mockBooking = {
      _id: `booking-${Date.now()}`,
      userId,
      mentorId: id,
      sessionType,
      scheduledDate: new Date(scheduledDate),
      duration: duration || 60,
      status: 'pending',
      amount: 150, // Mock amount
      paymentStatus: 'pending',
      studentGoals,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json({
      message: 'Session booked successfully (Demo Mode)',
      booking: mockBooking
    });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ message: 'Server error booking session' });
  }
});

// Get mentor reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Demo mode: return mock reviews
    const mockReviews = [
      {
        _id: 'review-1',
        userId: 'user-1',
        userName: 'Alex Johnson',
        rating: 5,
        review: 'Sarah was incredibly helpful in my college application process. Her insights were invaluable!',
        createdAt: new Date('2024-01-15'),
        sessionType: 'consultation'
      },
      {
        _id: 'review-2',
        userId: 'user-2',
        userName: 'Emma Davis',
        rating: 5,
        review: 'Amazing mentor! Really helped me craft my personal statement and get into my dream school.',
        createdAt: new Date('2024-01-10'),
        sessionType: 'essay-review'
      },
      {
        _id: 'review-3',
        userId: 'user-3',
        userName: 'Michael Chen',
        rating: 4,
        review: 'Great experience overall. Very knowledgeable about the admissions process.',
        createdAt: new Date('2024-01-05'),
        sessionType: 'strategy-session'
      }
    ];

    res.json({
      reviews: mockReviews,
      totalCount: mockReviews.length,
      averageRating: 4.9
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

export default router;
