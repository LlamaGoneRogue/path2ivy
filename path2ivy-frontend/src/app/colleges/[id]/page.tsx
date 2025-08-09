'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  MapIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface StudentProfile {
  gpa: number;
  satScore: number;
  actScore: number;
  familyIncome: number;
  state: string;
  ethnicity: string;
  firstGen: boolean;
  intendedMajor: string[];
  leadershipRoles: string[];
  communityService: number;
  researchExperience: boolean;
  internshipExperience: boolean;
  awards: string[];
  extracurriculars: string[];
}

interface College {
  id: string;
  name: string;
  location: string;
  acceptanceRate: number;
  averageGPA: number;
  averageSAT: number;
  averageACT: number;
  region: string;
  type: 'public' | 'private';
  size: 'small' | 'medium' | 'large';
  majors: string[];
  tuition: number;
  category: 'safe' | 'target' | 'reach' | 'extremeReach';
  matchScore: number;
  description: string;
  highlights: string[];
  applicationDeadline: string;
  earlyDecisionDeadline?: string;
  financialAidDeadline: string;
  requirements: {
    essays: number;
    recommendations: number;
    testOptional: boolean;
    interviewRequired: boolean;
    portfolioRequired: boolean;
  };
  applicationSteps: string[];
  tips: string[];
  financialAid: {
    needBased: boolean;
    meritBased: boolean;
    averageAward: number;
    percentageReceiving: number;
  };
  // Additional criteria for matching
  maxFamilyIncome?: number;
  minFamilyIncome?: number;
  states?: string[];
  ruralPreference?: boolean;
  urbanPreference?: boolean;
  leadershipRequired?: boolean;
  communityServiceRequired?: number;
  workExperienceRequired?: boolean;
  militaryPreference?: boolean;
  disabilityPreference?: boolean;
  highSchoolType?: string[];
  classRankRequired?: number;
  extracurriculars?: string[];
  researchExperience?: boolean;
}

const mockStudentProfile: StudentProfile = {
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
  extracurriculars: ['Robotics Club', 'Math Team', 'Community Service', 'Coding Club']
};

const mockColleges: College[] = [
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
    requirements: {
      essays: 3,
      recommendations: 2,
      testOptional: false,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit Common Application or Coalition Application',
      'Complete Stanford-specific questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores',
      'Submit two teacher recommendations',
      'Submit counselor recommendation',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Focus on demonstrating intellectual vitality and curiosity',
      'Showcase your unique perspective and experiences',
      'Emphasize leadership and community involvement',
      'Be authentic in your essays - Stanford values genuine voices',
      'Highlight research or entrepreneurial experiences if applicable'
    ],
    financialAid: {
      needBased: true,
      meritBased: false,
      averageAward: 52000,
      percentageReceiving: 65
    },
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
    requirements: {
      essays: 4,
      recommendations: 0,
      testOptional: true,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit UC Application',
      'Complete Personal Insight Questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores (optional for 2024)',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Focus on your personal insight questions - they carry significant weight',
      'Demonstrate leadership and community involvement',
      'Show how you\'ve overcome challenges or obstacles',
      'Highlight your academic achievements and intellectual curiosity',
      'Be specific about why Berkeley is the right fit for you'
    ],
    financialAid: {
      needBased: true,
      meritBased: true,
      averageAward: 18000,
      percentageReceiving: 70
    }
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
    requirements: {
      essays: 4,
      recommendations: 0,
      testOptional: true,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit UC Application',
      'Complete Personal Insight Questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores (optional for 2024)',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Emphasize your interest in research and STEM fields',
      'Show how you\'ve demonstrated leadership and initiative',
      'Highlight any research experience or scientific projects',
      'Demonstrate your passion for learning and discovery',
      'Show how UCSD aligns with your academic and career goals'
    ],
    financialAid: {
      needBased: true,
      meritBased: true,
      averageAward: 16000,
      percentageReceiving: 75
    }
  },
  {
    id: '4',
    name: 'University of Southern California',
    location: 'Los Angeles, CA',
    acceptanceRate: 16.1,
    averageGPA: 3.79,
    averageSAT: 1440,
    averageACT: 32,
    region: 'West Coast',
    type: 'private',
    size: 'large',
    majors: ['Business', 'Film', 'Engineering', 'Communication', 'Computer Science'],
    tuition: 64111,
    category: 'reach',
    matchScore: 0.82,
    description: 'USC is a private research university known for its strong professional programs, especially in business and film.',
    highlights: ['Strong professional programs', 'Film school excellence', 'Alumni network', 'Los Angeles location'],
    applicationDeadline: '2024-01-15',
    earlyDecisionDeadline: '2024-11-01',
    financialAidDeadline: '2024-02-15',
    requirements: {
      essays: 2,
      recommendations: 1,
      testOptional: true,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit Common Application',
      'Complete USC-specific questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores (optional)',
      'Submit one teacher recommendation',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Showcase your passion for your intended major',
      'Demonstrate leadership and initiative in your activities',
      'Highlight any creative or entrepreneurial projects',
      'Show how USC\'s location and opportunities align with your goals',
      'Emphasize your commitment to making a positive impact'
    ],
    financialAid: {
      needBased: true,
      meritBased: true,
      averageAward: 45000,
      percentageReceiving: 60
    }
  },
  {
    id: '5',
    name: 'University of California, Irvine',
    location: 'Irvine, CA',
    acceptanceRate: 28.9,
    averageGPA: 3.76,
    averageSAT: 1350,
    averageACT: 29,
    region: 'West Coast',
    type: 'public',
    size: 'large',
    majors: ['Computer Science', 'Biology', 'Engineering', 'Psychology', 'Business'],
    tuition: 44115,
    category: 'target',
    matchScore: 0.95,
    description: 'UC Irvine is a public research university known for its strong research programs and diverse student body.',
    highlights: ['Strong research programs', 'Diverse student body', 'Safe campus environment', 'Good value for money'],
    applicationDeadline: '2024-11-30',
    financialAidDeadline: '2024-03-02',
    requirements: {
      essays: 4,
      recommendations: 0,
      testOptional: true,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit UC Application',
      'Complete Personal Insight Questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores (optional for 2024)',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Emphasize your academic achievements and intellectual curiosity',
      'Show how you\'ve demonstrated leadership and initiative',
      'Highlight any research experience or community involvement',
      'Demonstrate your passion for your intended major',
      'Show how UCI\'s programs align with your career goals'
    ],
    financialAid: {
      needBased: true,
      meritBased: true,
      averageAward: 15000,
      percentageReceiving: 80
    }
  },
  {
    id: '6',
    name: 'California Polytechnic State University',
    location: 'San Luis Obispo, CA',
    acceptanceRate: 30.2,
    averageGPA: 3.72,
    averageSAT: 1330,
    averageACT: 28,
    region: 'West Coast',
    type: 'public',
    size: 'medium',
    majors: ['Engineering', 'Architecture', 'Business', 'Agriculture', 'Computer Science'],
    tuition: 28000,
    category: 'safe',
    matchScore: 0.98,
    description: 'Cal Poly is a public university known for its "Learn by Doing" philosophy and strong hands-on programs.',
    highlights: ['Learn by Doing philosophy', 'Strong hands-on programs', 'Beautiful campus', 'Good job placement'],
    applicationDeadline: '2024-11-30',
    financialAidDeadline: '2024-03-02',
    requirements: {
      essays: 4,
      recommendations: 0,
      testOptional: true,
      interviewRequired: false,
      portfolioRequired: false
    },
    applicationSteps: [
      'Submit UC Application',
      'Complete Personal Insight Questions',
      'Submit official high school transcript',
      'Submit SAT or ACT scores (optional for 2024)',
      'Complete financial aid application (if applicable)'
    ],
    tips: [
      'Emphasize your interest in hands-on learning and practical experience',
      'Show how you\'ve demonstrated initiative and problem-solving skills',
      'Highlight any projects, internships, or work experience',
      'Demonstrate your passion for your intended major',
      'Show how Cal Poly\'s "Learn by Doing" approach fits your learning style'
    ],
    financialAid: {
      needBased: true,
      meritBased: true,
      averageAward: 12000,
      percentageReceiving: 85
    }
  }
];

export default function CollegeDetailPage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const collegeId = params.id as string;
    const foundCollege = mockColleges.find(c => c.id === collegeId);
    if (foundCollege) {
      const calculatedMatchScore = calculateMatchScore(foundCollege, mockStudentProfile);
      setCollege({
        ...foundCollege,
        matchScore: calculatedMatchScore / 100
      });
    } else {
      setCollege(null);
    }
  }, [params.id]);

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h2>
          <p className="text-gray-600 mb-6">The college you're looking for doesn't exist.</p>
          <Link href="/colleges" className="btn-primary">
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'target': return 'text-blue-600 bg-blue-100';
      case 'reach': return 'text-orange-600 bg-orange-100';
      case 'extremeReach': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-100';
    if (score >= 0.7) return 'text-blue-600 bg-blue-100';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const calculateMatchScore = (college: College, profile: StudentProfile): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (40% weight)
    if (profile.gpa >= college.averageGPA) {
      score += 40;
    }
    totalCriteria += 40;

    if (college.averageSAT && profile.satScore) {
      if (profile.satScore >= college.averageSAT) {
        score += 20;
      }
      totalCriteria += 20;
    }

    if (college.averageACT && profile.actScore) {
      if (profile.actScore >= college.averageACT) {
        score += 20;
      }
      totalCriteria += 20;
    }

    // Financial criteria (25% weight)
    if (college.maxFamilyIncome && profile.familyIncome <= college.maxFamilyIncome) {
      score += 25;
    }
    totalCriteria += 25;

    // Geographic criteria (15% weight)
    if (college.states && college.states.includes(profile.state)) {
      score += 15;
    } else if (!college.states) {
      score += 15; // National scholarships
    }
    totalCriteria += 15;

    // Major criteria (10% weight)
    if (college.majors.includes('All majors') || 
        profile.intendedMajor.some(major => college.majors.includes(major))) {
      score += 10;
    }
    totalCriteria += 10;

    // Leadership criteria (10% weight)
    if (college.leadershipRequired && profile.leadershipRoles.length > 0) {
      score += 10;
    }
    totalCriteria += 10;

    // Community service criteria (10% weight)
    if (college.communityServiceRequired && profile.communityService >= college.communityServiceRequired) {
      score += 10;
    }
    totalCriteria += 10;

    // Research experience criteria (10% weight)
    if (college.researchExperience && profile.researchExperience) {
      score += 10;
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">Path2Ivy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/scholarships" className="text-gray-600 hover:text-blue-600 transition-colors">
                Scholarships
              </Link>
              <Link href="/extracurriculars" className="text-gray-600 hover:text-blue-600 transition-colors">
                Extracurriculars
              </Link>
              <Link href="/mentors" className="text-gray-600 hover:text-blue-600 transition-colors">
                Mentors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            href="/colleges" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Colleges
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(college.category)}`}>
                  {college.category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <MapIcon className="w-5 h-5" />
                <span>{college.location}</span>
                <span>•</span>
                <span>{college.type.charAt(0).toUpperCase() + college.type.slice(1)}</span>
                <span>•</span>
                <span>{college.size.charAt(0).toUpperCase() + college.size.slice(1)}</span>
              </div>

              <p className="text-gray-600 mb-6">{college.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{college.acceptanceRate}%</div>
                  <div className="text-sm text-gray-600">Acceptance Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{college.averageGPA}</div>
                  <div className="text-sm text-gray-600">Avg GPA</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{college.averageSAT}</div>
                  <div className="text-sm text-gray-600">Avg SAT</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">${college.tuition.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Tuition</div>
                </div>
              </div>
            </div>

            <div className="lg:ml-8 mt-6 lg:mt-0">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {Math.round(college.matchScore * 100)}%
                  </div>
                  <div className="text-sm text-blue-600">Match Score</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your GPA:</span>
                    <span className="font-medium">{mockStudentProfile.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your SAT:</span>
                    <span className="font-medium">{mockStudentProfile.satScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your ACT:</span>
                    <span className="font-medium">{mockStudentProfile.actScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your State:</span>
                    <span className="font-medium">{mockStudentProfile.state}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: AcademicCapIcon },
                { id: 'requirements', name: 'Requirements', icon: DocumentTextIcon },
                { id: 'application', name: 'Application', icon: CalendarIcon },
                { id: 'financial', name: 'Financial Aid', icon: CurrencyDollarIcon },
                { id: 'tips', name: 'Tips & Advice', icon: StarIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {college.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Majors</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.majors.map((major, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {major}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campus Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <BuildingLibraryIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Type</div>
                        <div className="text-sm text-gray-600">{college.type.charAt(0).toUpperCase() + college.type.slice(1)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <UserGroupIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Size</div>
                        <div className="text-sm text-gray-600">{college.size.charAt(0).toUpperCase() + college.size.slice(1)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Region</div>
                        <div className="text-sm text-gray-600">{college.region}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ChartBarIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Acceptance Rate</div>
                        <div className="text-sm text-gray-600">{college.acceptanceRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">GPA Requirements</div>
                      <div className="text-2xl font-bold text-blue-600">{college.averageGPA}</div>
                      <div className="text-sm text-gray-600">Average admitted GPA</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">SAT Requirements</div>
                      <div className="text-2xl font-bold text-green-600">{college.averageSAT}</div>
                      <div className="text-sm text-gray-600">Average admitted SAT</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">ACT Requirements</div>
                      <div className="text-2xl font-bold text-purple-600">{college.averageACT}</div>
                      <div className="text-sm text-gray-600">Average admitted ACT</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">Test Policy</div>
                      <div className="text-lg font-semibold text-orange-600">
                        {college.requirements.testOptional ? 'Test Optional' : 'Test Required'}
                      </div>
                      <div className="text-sm text-gray-600">Current policy</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Essays</span>
                      </div>
                      <span className="text-gray-600">{college.requirements.essays} required</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <UserGroupIcon className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Recommendations</span>
                      </div>
                      <span className="text-gray-600">{college.requirements.recommendations} required</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Interview</span>
                      </div>
                      <span className="text-gray-600">
                        {college.requirements.interviewRequired ? 'Required' : 'Not required'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AcademicCapIcon className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Portfolio</span>
                      </div>
                      <span className="text-gray-600">
                        {college.requirements.portfolioRequired ? 'Required' : 'Not required'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Deadlines</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                        <div>
                          <div className="font-medium text-gray-900">Regular Decision</div>
                          <div className="text-sm text-gray-600">Application deadline</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-red-600">{formatDate(college.applicationDeadline)}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(college.applicationDeadline) > new Date() ? 'Upcoming' : 'Past'}
                        </div>
                      </div>
                    </div>
                    
                    {college.earlyDecisionDeadline && (
                      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CalendarIcon className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium text-gray-900">Early Decision</div>
                            <div className="text-sm text-gray-600">Early application deadline</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-600">{formatDate(college.earlyDecisionDeadline)}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(college.earlyDecisionDeadline) > new Date() ? 'Upcoming' : 'Past'}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium text-gray-900">Financial Aid</div>
                          <div className="text-sm text-gray-600">Financial aid deadline</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{formatDate(college.financialAidDeadline)}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(college.financialAidDeadline) > new Date() ? 'Upcoming' : 'Past'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Steps</h3>
                  <div className="space-y-3">
                    {college.applicationSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Aid Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">Need-Based Aid</div>
                      <div className="text-2xl font-bold text-green-600">
                        {college.financialAid.needBased ? 'Available' : 'Not Available'}
                      </div>
                      <div className="text-sm text-gray-600">Based on family income</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">Merit-Based Aid</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {college.financialAid.meritBased ? 'Available' : 'Not Available'}
                      </div>
                      <div className="text-sm text-gray-600">Based on academic achievement</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">Average Award</div>
                      <div className="text-2xl font-bold text-purple-600">${college.financialAid.averageAward.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Per year</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">Students Receiving Aid</div>
                      <div className="text-2xl font-bold text-orange-600">{college.financialAid.percentageReceiving}%</div>
                      <div className="text-sm text-gray-600">Of enrolled students</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tuition & Costs</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tuition & Fees</span>
                        <span className="font-medium">${college.tuition.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Room & Board</span>
                        <span className="font-medium">$15,000 - $20,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Books & Supplies</span>
                        <span className="font-medium">$1,200 - $1,800</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Personal Expenses</span>
                        <span className="font-medium">$2,000 - $3,000</span>
                      </div>
                      <hr className="border-gray-300" />
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <span>Total Estimated Cost</span>
                        <span>${(college.tuition + 18000).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tips</h3>
                  <div className="space-y-4">
                    {college.tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <StarIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Strategies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Strengthen Your Application</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Maintain strong academic performance</li>
                        <li>• Take challenging courses</li>
                        <li>• Build meaningful extracurriculars</li>
                        <li>• Develop leadership skills</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Essay Writing</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Be authentic and personal</li>
                        <li>• Show your unique perspective</li>
                        <li>• Demonstrate growth and learning</li>
                        <li>• Connect to your future goals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get personalized guidance from our expert mentors who can help you craft a compelling application and navigate the admissions process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentors" className="btn-white">
              Find a Mentor
            </Link>
            <Link href="/scholarships" className="btn-ghost text-white border-white hover:bg-white hover:text-blue-600">
              Find Scholarships
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
