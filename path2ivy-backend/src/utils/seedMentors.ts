import Mentor from '../models/Mentor';

export const seedMentors = async () => {
  try {
    const existingMentors = await Mentor.countDocuments();
    if (existingMentors > 0) {
      console.log('🧑‍🏫 Mentors already seeded');
      return;
    }

    const mentorData = [
      {
        firstName: 'Sarah',
        lastName: 'Chen',
        email: 'sarah.chen@example.com',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        title: 'Former Harvard Admissions Officer',
        institution: 'Harvard University',
        expertise: ['College Admissions', 'Essay Writing', 'Ivy League'],
        biography: 'Former admissions officer at Harvard with 8 years of experience. Helped over 500 students get accepted to top-tier universities. Specialized in crafting compelling personal narratives and strategic application planning.',
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
          },
          {
            degree: 'B.A. in Psychology',
            institution: 'Yale University',
            graduationYear: 2013
          }
        ],
        achievements: [
          '500+ successful admissions to top universities',
          'Featured speaker at National College Counseling Conference',
          'Published researcher on admissions trends'
        ],
        languages: ['English', 'Mandarin'],
        timezone: 'America/New_York',
        isVerified: true,
        isActive: true,
        totalSessions: 340,
        successStories: 287,
        responseTime: 'Within 6 hours'
      },
      {
        firstName: 'Michael',
        lastName: 'Rodriguez',
        email: 'michael.rodriguez@example.com',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        title: 'MIT Alumni & STEM Specialist',
        institution: 'Massachusetts Institute of Technology',
        expertise: ['STEM Applications', 'Test Prep', 'Engineering'],
        biography: 'MIT graduate with extensive experience in STEM education and admissions. Currently works as a senior software engineer while mentoring aspiring engineers and scientists.',
        experience: 6,
        rating: 4.8,
        reviewCount: 89,
        hourlyRate: 120,
        availability: {
          days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
          timeSlots: ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 AM', '10:00 AM']
        },
        specializations: ['STEM Applications', 'Test Prep', 'Career Guidance', 'Graduate School'],
        education: [
          {
            degree: 'M.S. in Computer Science',
            institution: 'Massachusetts Institute of Technology',
            graduationYear: 2018
          },
          {
            degree: 'B.S. in Electrical Engineering',
            institution: 'UC Berkeley',
            graduationYear: 2016
          }
        ],
        achievements: [
          'Led 200+ students to STEM program acceptances',
          'Google Software Engineer',
          'Published 15+ technical papers'
        ],
        languages: ['English', 'Spanish'],
        timezone: 'America/Los_Angeles',
        isVerified: true,
        isActive: true,
        totalSessions: 156,
        successStories: 134,
        responseTime: 'Within 12 hours'
      },
      {
        firstName: 'Dr. Priya',
        lastName: 'Patel',
        email: 'priya.patel@example.com',
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        title: 'Medical School Advisor',
        institution: 'Johns Hopkins University',
        expertise: ['Medical School', 'Pre-Med Guidance', 'Research'],
        biography: 'Practicing physician and former medical school admissions committee member. Specializes in guiding pre-med students through the complex medical school application process.',
        experience: 12,
        rating: 5.0,
        reviewCount: 156,
        hourlyRate: 180,
        availability: {
          days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
          timeSlots: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 AM', '9:00 AM']
        },
        specializations: ['Medical School', 'STEM Applications', 'Research', 'Interview Prep'],
        education: [
          {
            degree: 'M.D.',
            institution: 'Johns Hopkins School of Medicine',
            graduationYear: 2012
          },
          {
            degree: 'B.S. in Biology',
            institution: 'Stanford University',
            graduationYear: 2008
          }
        ],
        achievements: [
          '95% medical school acceptance rate for mentees',
          'Published 30+ medical research papers',
          'Johns Hopkins Teaching Excellence Award'
        ],
        languages: ['English', 'Hindi', 'Gujarati'],
        timezone: 'America/New_York',
        isVerified: true,
        isActive: true,
        totalSessions: 298,
        successStories: 267,
        responseTime: 'Within 8 hours'
      },
      {
        firstName: 'James',
        lastName: 'Thompson',
        email: 'james.thompson@example.com',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        title: 'Financial Aid Specialist',
        institution: 'Princeton University',
        expertise: ['Financial Aid', 'Scholarship Applications', 'Need-Based Aid'],
        biography: 'Former financial aid director with 15 years of experience helping families navigate college funding. Expert in maximizing financial aid packages and scholarship opportunities.',
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
          {
            degree: 'M.A. in Education Policy',
            institution: 'Princeton University',
            graduationYear: 2009
          },
          {
            degree: 'B.A. in Economics',
            institution: 'University of Pennsylvania',
            graduationYear: 2007
          }
        ],
        achievements: [
          'Secured $50M+ in financial aid for students',
          'National Association of Student Financial Aid Administrators Award',
          'Expert contributor to College Board publications'
        ],
        languages: ['English'],
        timezone: 'America/New_York',
        isVerified: true,
        isActive: true,
        totalSessions: 487,
        successStories: 445,
        responseTime: 'Within 4 hours'
      },
      {
        firstName: 'Dr. Emily',
        lastName: 'Foster',
        email: 'emily.foster@example.com',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        title: 'Liberal Arts Counselor',
        institution: 'Williams College',
        expertise: ['Liberal Arts', 'Essay Writing', 'Creative Applications'],
        biography: 'English professor and former admissions counselor specializing in liberal arts applications. Published author with expertise in creative writing and humanities applications.',
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
          {
            degree: 'Ph.D. in English Literature',
            institution: 'Columbia University',
            graduationYear: 2014
          },
          {
            degree: 'M.A. in Creative Writing',
            institution: 'University of Iowa',
            graduationYear: 2011
          },
          {
            degree: 'B.A. in English',
            institution: 'Williams College',
            graduationYear: 2009
          }
        ],
        achievements: [
          'Published novelist and poet',
          'Williams College Excellence in Teaching Award',
          '300+ successful liberal arts admissions'
        ],
        languages: ['English', 'French'],
        timezone: 'America/New_York',
        isVerified: true,
        isActive: true,
        totalSessions: 234,
        successStories: 201,
        responseTime: 'Within 24 hours'
      },
      {
        firstName: 'David',
        lastName: 'Kim',
        email: 'david.kim@example.com',
        profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
        title: 'Business School Advisor',
        institution: 'Wharton School, University of Pennsylvania',
        expertise: ['Business School', 'MBA Applications', 'Leadership'],
        biography: 'MBA from Wharton and successful entrepreneur. Specializes in business school applications and career strategy for aspiring business leaders.',
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
          {
            degree: 'MBA',
            institution: 'Wharton School, University of Pennsylvania',
            graduationYear: 2017
          },
          {
            degree: 'B.S. in Finance',
            institution: 'New York University',
            graduationYear: 2015
          }
        ],
        achievements: [
          'Founded two successful startups',
          'Featured in Forbes 30 Under 30',
          '150+ successful MBA admissions'
        ],
        languages: ['English', 'Korean'],
        timezone: 'America/Los_Angeles',
        isVerified: true,
        isActive: true,
        totalSessions: 167,
        successStories: 143,
        responseTime: 'Within 6 hours'
      }
    ];

    await Mentor.insertMany(mentorData);
    console.log('🧑‍🏫 Sample mentors seeded successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.warn('⚠️ Error seeding mentors:', error.message);
    } else {
      console.warn('⚠️ Unknown error seeding mentors');
    }
  }
};



