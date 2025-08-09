import { StudentProfile, College, Scholarship, Mentor, Activity, RoadmapPhase, Achievement } from '../types';

export const mockStudentProfile: StudentProfile = {
  gpa: 3.8,
  satScore: 1480,
  actScore: 32,
  familyIncome: 75000,
  state: 'California',
  ethnicity: 'Hispanic',
  firstGen: true,
  intendedMajor: ['Computer Science', 'Engineering'],
  leadershipRoles: ['Student Council President', 'Robotics Club Captain'],
  communityService: 120,
  researchExperience: true,
  internshipExperience: false,
  awards: ['National Merit Scholar', 'AP Scholar with Distinction'],
  extracurriculars: ['Robotics Club', 'Math Team', 'Community Service', 'Coding Club'],
  targetColleges: ['Stanford University', 'UC Berkeley', 'MIT', 'Caltech'],
  applicationStage: 'preparing',
  budget: 150,
  preferredSpecializations: ['College Admissions', 'Essay Writing', 'STEM Applications', 'Ivy League']
};

export const mockColleges: College[] = [
  {
    id: '1',
    name: 'Stanford University',
    location: 'Stanford, CA',
    acceptanceRate: 4.3,
    averageGPA: 3.96,
    averageSAT: 1500,
    averageACT: 33,
    region: 'West Coast',
    type: 'private',
    size: 'large',
    majors: ['Computer Science', 'Engineering', 'Biology', 'Economics', 'Psychology'],
    tuition: 56169,
    category: 'extremeReach',
    matchScore: 0.85,
    description: 'Stanford University is a private research university known for its academic achievements, close connection to the tech industry, and entrepreneurial character.',
    highlights: ['World-class research opportunities', 'Silicon Valley connections', 'Strong entrepreneurship programs', 'Beautiful campus'],
    applicationDeadline: '2024-01-05',
    earlyDecisionDeadline: '2024-11-01',
    financialAidDeadline: '2024-02-15',
    maxFamilyIncome: 150000,
    states: ['California', 'All states'],
    leadershipRequired: true,
    communityServiceRequired: 50,
    researchExperience: true,
    extracurriculars: ['Robotics', 'Coding', 'Research', 'Leadership']
  },
  {
    id: '2',
    name: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    acceptanceRate: 17.5,
    averageGPA: 3.89,
    averageSAT: 1415,
    averageACT: 31,
    region: 'West Coast',
    type: 'public',
    size: 'large',
    majors: ['Computer Science', 'Engineering', 'Business', 'Environmental Science', 'Political Science'],
    tuition: 44115,
    category: 'reach',
    matchScore: 0.78,
    description: 'UC Berkeley is a top-ranked public university known for its academic excellence, research opportunities, and commitment to social justice.',
    highlights: ['Top public university', 'Strong research programs', 'Diverse student body', 'Progressive campus culture'],
    applicationDeadline: '2024-11-30',
    financialAidDeadline: '2024-03-02',
    maxFamilyIncome: 120000,
    states: ['California', 'All states'],
    leadershipRequired: false,
    communityServiceRequired: 20,
    researchExperience: false,
    extracurriculars: ['STEM', 'Research', 'Community Service']
  },
  {
    id: '3',
    name: 'University of California, San Diego',
    location: 'San Diego, CA',
    acceptanceRate: 34.2,
    averageGPA: 3.85,
    averageSAT: 1380,
    averageACT: 30,
    region: 'West Coast',
    type: 'public',
    size: 'large',
    majors: ['Computer Science', 'Biology', 'Engineering', 'Psychology', 'Economics'],
    tuition: 44115,
    category: 'target',
    matchScore: 0.92,
    description: 'UC San Diego is a public research university known for its strong STEM programs and beautiful coastal location.',
    highlights: ['Excellent STEM programs', 'Beautiful campus location', 'Strong research opportunities', 'Diverse community'],
    applicationDeadline: '2024-11-30',
    financialAidDeadline: '2024-03-02',
    maxFamilyIncome: 100000,
    states: ['California', 'All states'],
    leadershipRequired: false,
    communityServiceRequired: 30,
    researchExperience: true,
    extracurriculars: ['STEM', 'Research', 'Community Service']
  }
];

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Hispanic Scholarship Fund',
    amount: 5000,
    deadline: '2024-03-15',
    gpa: 3.0,
    satScore: 1200,
    majors: ['Computer Science', 'Engineering', 'All majors'],
    ethnicity: 'Hispanic',
    category: 'ethnicity',
    matchScore: 0.95,
    description: 'Scholarship for Hispanic students pursuing higher education in STEM fields.',
    requirements: ['Hispanic heritage', '3.0+ GPA', 'Full-time enrollment', 'US citizen or permanent resident'],
    applicationSteps: ['Complete online application', 'Submit transcripts', 'Write personal statement', 'Provide letters of recommendation'],
    tips: ['Emphasize your Hispanic heritage and cultural background', 'Highlight community involvement', 'Show strong academic performance', 'Demonstrate financial need'],
    maxFamilyIncome: 100000,
    states: ['All states'],
    leadershipRequired: false,
    communityServiceRequired: 20
  },
  {
    id: '2',
    name: 'National Merit Scholarship',
    amount: 2500,
    deadline: '2024-02-01',
    gpa: 3.5,
    satScore: 1400,
    majors: ['All majors'],
    category: 'merit',
    matchScore: 0.88,
    description: 'Merit-based scholarship for high-achieving students.',
    requirements: ['National Merit Finalist', '3.5+ GPA', 'Strong academic record'],
    applicationSteps: ['Take PSAT/NMSQT', 'Become a Finalist', 'Complete application', 'Submit supporting documents'],
    tips: ['Focus on academic excellence', 'Maintain high GPA', 'Prepare for PSAT', 'Highlight leadership activities'],
    maxFamilyIncome: 150000,
    states: ['All states'],
    leadershipRequired: true,
    communityServiceRequired: 50
  }
];

export const mockMentors: Mentor[] = [
  {
    id: '1',
    firstName: 'Dr. Sarah',
    lastName: 'Chen',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    title: 'Former Stanford Admissions Officer',
    institution: 'Stanford University',
    expertise: ['Ivy League Admissions', 'Essay Writing', 'STEM Applications'],
    biography: 'Former Stanford admissions officer with 8 years of experience evaluating applications. Specializes in helping students craft compelling personal statements and navigate the competitive admissions process.',
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 180,
    specializations: ['College Admissions', 'Essay Writing', 'Ivy League', 'STEM Applications'],
    languages: ['English', 'Mandarin'],
    responseTime: 'within 2 hours',
    totalSessions: 450,
    successStories: 89,
    isVerified: true,
    matchScore: 0.95,
    targetColleges: ['Stanford University', 'UC Berkeley', 'MIT', 'Caltech'],
    preferredStudentTypes: ['High-achieving', 'STEM-focused', 'First-generation'],
    maxBudget: 200,
    minGPA: 3.7,
    minSAT: 1400,
    minACT: 30,
    expertiseAreas: ['Computer Science', 'Engineering', 'Research'],
    successRate: 92,
    availability: ['Weekdays', 'Weekends'],
    communicationStyle: ['Direct', 'Encouraging', 'Structured'],
    strengths: ['Essay coaching', 'Application strategy', 'Interview prep']
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'College Admissions Consultant',
    institution: 'Harvard University (Alumni)',
    expertise: ['Financial Aid', 'Scholarship Applications', 'First-Gen Support'],
    biography: 'Harvard alum and first-generation college graduate. Dedicated to helping students from underrepresented backgrounds navigate the college admissions process and secure financial aid.',
    experience: 6,
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 120,
    specializations: ['Financial Aid', 'Scholarship Applications', 'First-Gen Support', 'College Admissions'],
    languages: ['English', 'Spanish'],
    responseTime: 'within 4 hours',
    totalSessions: 320,
    successStories: 67,
    isVerified: true,
    matchScore: 0.88,
    targetColleges: ['All Ivy League', 'Top Public Universities'],
    preferredStudentTypes: ['First-generation', 'Hispanic', 'Financial aid need'],
    maxBudget: 150,
    minGPA: 3.5,
    minSAT: 1300,
    minACT: 28,
    expertiseAreas: ['Financial Aid', 'Scholarships', 'First-gen support'],
    successRate: 89,
    availability: ['Evenings', 'Weekends'],
    communicationStyle: ['Supportive', 'Patient', 'Encouraging'],
    strengths: ['Financial aid guidance', 'Scholarship applications', 'First-gen support']
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Robotics Club Captain',
    category: 'leadership',
    description: 'Led a team of 15 students in building and programming robots for competitions.',
    organization: 'High School Robotics Club',
    location: 'San Jose, CA',
    startDate: '2023-09-01',
    endDate: '2024-06-01',
    hoursPerWeek: 8,
    totalHours: 320,
    role: 'Team Captain',
    achievements: ['Won regional competition', 'Mentored 5 new members', 'Improved team efficiency by 40%'],
    skills: ['Leadership', 'Programming', 'Mechanical Engineering', 'Team Management'],
    isOngoing: true,
    impact: 'Increased club membership by 50% and achieved highest competition ranking in school history.',
    awards: ['Best Team Captain Award', 'Regional Competition Winner'],
    supervisor: 'Mr. Johnson',
    supervisorContact: 'johnson@school.edu'
  },
  {
    id: '2',
    title: 'Community Service Volunteer',
    category: 'volunteering',
    description: 'Volunteered at local food bank and homeless shelter, organizing donation drives and serving meals.',
    organization: 'Community Service Center',
    location: 'San Jose, CA',
    startDate: '2023-01-01',
    endDate: '2024-06-01',
    hoursPerWeek: 4,
    totalHours: 120,
    role: 'Volunteer Coordinator',
    achievements: ['Organized 3 major donation drives', 'Recruited 20 new volunteers', 'Served 500+ meals'],
    skills: ['Organization', 'Communication', 'Event Planning', 'Community Outreach'],
    isOngoing: true,
    impact: 'Helped provide food and shelter to over 200 families in need.',
    supervisor: 'Ms. Garcia',
    supervisorContact: 'garcia@community.org'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Research Enthusiast',
    description: 'Completed first research project with measurable impact',
    icon: 'beaker',
    category: 'research',
    earnedDate: '2024-01-31',
    points: 200
  },
  {
    id: '2',
    title: 'Community Champion',
    description: 'Completed 100+ hours of community service',
    icon: 'heart',
    category: 'volunteering',
    earnedDate: '2024-02-15',
    points: 150
  },
  {
    id: '3',
    title: 'Leadership Excellence',
    description: 'Demonstrated exceptional leadership in multiple organizations',
    icon: 'trophy',
    category: 'leadership',
    earnedDate: '2024-01-20',
    points: 300
  }
];

export const mockRoadmap: RoadmapPhase[] = [
  {
    id: '1',
    title: 'Foundation Building',
    description: 'Strengthen academic foundation and build core competencies',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    isActive: true,
    isCompleted: false,
    progress: 75,
    milestones: [
      {
        id: '1-1',
        title: 'Maintain High GPA',
        description: 'Keep GPA above 3.8 throughout the semester',
        dueDate: '2024-06-30',
        isCompleted: false,
        progress: 80,
        tasks: [
          {
            id: '1-1-1',
            title: 'Complete all assignments on time',
            description: 'Submit all homework and projects before deadlines',
            isCompleted: true,
            dueDate: '2024-06-30',
            priority: 'high'
          },
          {
            id: '1-1-2',
            title: 'Study for final exams',
            description: 'Prepare comprehensive study materials for all subjects',
            isCompleted: false,
            dueDate: '2024-06-15',
            priority: 'high'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Improve SAT Score',
        description: 'Achieve 1500+ on SAT through focused preparation',
        dueDate: '2024-05-15',
        isCompleted: false,
        progress: 60,
        tasks: [
          {
            id: '1-2-1',
            title: 'Complete practice tests',
            description: 'Take 5 full-length practice tests',
            isCompleted: true,
            dueDate: '2024-05-01',
            priority: 'medium'
          },
          {
            id: '1-2-2',
            title: 'Focus on weak areas',
            description: 'Target math and reading comprehension',
            isCompleted: false,
            dueDate: '2024-05-15',
            priority: 'high'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Application Preparation',
    description: 'Prepare compelling applications and essays',
    startDate: '2024-07-01',
    endDate: '2024-11-30',
    isActive: false,
    isCompleted: false,
    progress: 0,
    milestones: [
      {
        id: '2-1',
        title: 'Write Personal Statement',
        description: 'Craft a compelling 650-word personal statement',
        dueDate: '2024-10-15',
        isCompleted: false,
        progress: 0,
        tasks: [
          {
            id: '2-1-1',
            title: 'Brainstorm topics',
            description: 'Identify 3-5 potential essay topics',
            isCompleted: false,
            dueDate: '2024-08-01',
            priority: 'medium'
          },
          {
            id: '2-1-2',
            title: 'Write first draft',
            description: 'Complete initial draft of personal statement',
            isCompleted: false,
            dueDate: '2024-09-01',
            priority: 'high'
          }
        ]
      }
    ]
  }
];


