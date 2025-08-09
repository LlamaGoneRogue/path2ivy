'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Protected from '@/components/Protected';
import { useMentors } from '@/hooks/useMentors';
import { 
  MagnifyingGlassIcon,
  StarIcon,
  UserIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  GlobeAltIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { SkeletonCard } from '@/components/Skeleton';

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
  targetColleges: string[];
  applicationStage: 'planning' | 'preparing' | 'applying' | 'waiting';
  budget: number;
  preferredSpecializations: string[];
}

interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  title: string;
  institution: string;
  expertise: string[];
  biography: string;
  experience: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  specializations: string[];
  languages: string[];
  responseTime: string;
  totalSessions: number;
  successStories: number;
  isVerified: boolean;
  matchScore: number;
  // Additional criteria for matching
  targetColleges?: string[];
  preferredStudentTypes?: string[];
  maxBudget?: number;
  minGPA?: number;
  minSAT?: number;
  minACT?: number;
  expertiseAreas?: string[];
  successRate?: number;
  availability?: string[];
  communicationStyle?: string[];
  strengths?: string[];
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
  extracurriculars: ['Robotics Club', 'Math Team', 'Community Service', 'Coding Club'],
  targetColleges: ['Stanford University', 'UC Berkeley', 'MIT', 'Caltech'],
  applicationStage: 'preparing',
  budget: 150,
  preferredSpecializations: ['College Admissions', 'Essay Writing', 'STEM Applications', 'Ivy League']
};

const mockMentors: Mentor[] = [
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
  },
  {
    id: '3',
    firstName: 'Dr. Emily',
    lastName: 'Watson',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'STEM Admissions Specialist',
    institution: 'MIT (Alumni)',
    expertise: ['STEM Applications', 'Research Projects', 'Technical Interviews'],
    biography: 'MIT graduate with expertise in STEM admissions. Helps students showcase their technical skills, research experience, and passion for innovation in their applications.',
    experience: 5,
    rating: 4.7,
    reviewCount: 78,
    hourlyRate: 160,
    specializations: ['STEM Applications', 'Research Projects', 'Technical Interviews', 'Engineering'],
    languages: ['English'],
    responseTime: 'within 3 hours',
    totalSessions: 280,
    successStories: 52,
    isVerified: true,
    matchScore: 0.92,
    targetColleges: ['MIT', 'Caltech', 'Stanford', 'UC Berkeley'],
    preferredStudentTypes: ['STEM-focused', 'Research experience', 'High academic achievement'],
    maxBudget: 180,
    minGPA: 3.8,
    minSAT: 1450,
    minACT: 31,
    expertiseAreas: ['Computer Science', 'Engineering', 'Research'],
    successRate: 94,
    availability: ['Weekdays', 'Evenings'],
    communicationStyle: ['Technical', 'Analytical', 'Direct'],
    strengths: ['STEM applications', 'Research guidance', 'Technical interview prep']
  },
  {
    id: '4',
    firstName: 'James',
    lastName: 'Thompson',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Essay Writing Coach',
    institution: 'Yale University (Alumni)',
    expertise: ['Essay Writing', 'Personal Statements', 'Creative Writing'],
    biography: 'Yale graduate and former writing instructor. Specializes in helping students craft authentic, compelling personal statements that showcase their unique voice and experiences.',
    experience: 7,
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 140,
    specializations: ['Essay Writing', 'Personal Statements', 'Creative Writing', 'College Admissions'],
    languages: ['English'],
    responseTime: 'within 6 hours',
    totalSessions: 520,
    successStories: 98,
    isVerified: true,
    matchScore: 0.85,
    targetColleges: ['All Top Universities'],
    preferredStudentTypes: ['Strong writers', 'Creative thinkers', 'All backgrounds'],
    maxBudget: 160,
    minGPA: 3.3,
    minSAT: 1200,
    minACT: 25,
    expertiseAreas: ['Writing', 'Creative expression', 'Storytelling'],
    successRate: 96,
    availability: ['Flexible', 'Weekends'],
    communicationStyle: ['Creative', 'Encouraging', 'Patient'],
    strengths: ['Essay coaching', 'Personal statement development', 'Creative writing']
  },
  {
    id: '5',
    firstName: 'Dr. Lisa',
    lastName: 'Park',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    title: 'UC System Specialist',
    institution: 'UC Berkeley (Alumni)',
    expertise: ['UC Applications', 'California Schools', 'Public University Admissions'],
    biography: 'UC Berkeley graduate with deep knowledge of the UC system. Helps California students navigate the unique UC application process and maximize their chances of admission.',
    experience: 4,
    rating: 4.6,
    reviewCount: 89,
    hourlyRate: 100,
    specializations: ['UC Applications', 'California Schools', 'Public University Admissions'],
    languages: ['English', 'Korean'],
    responseTime: 'within 5 hours',
    totalSessions: 240,
    successStories: 45,
    isVerified: true,
    matchScore: 0.90,
    targetColleges: ['UC Berkeley', 'UC Los Angeles', 'UC San Diego', 'UC Irvine'],
    preferredStudentTypes: ['California residents', 'Public university focus', 'In-state students'],
    maxBudget: 120,
    minGPA: 3.4,
    minSAT: 1250,
    minACT: 26,
    expertiseAreas: ['UC system', 'California schools', 'Public universities'],
    successRate: 87,
    availability: ['Weekdays', 'Evenings'],
    communicationStyle: ['Practical', 'Direct', 'Supportive'],
    strengths: ['UC applications', 'California school guidance', 'Public university strategy']
  },
  {
    id: '6',
    firstName: 'Robert',
    lastName: 'Johnson',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    title: 'Interview Preparation Expert',
    institution: 'Princeton University (Alumni)',
    expertise: ['Interview Prep', 'Communication Skills', 'Confidence Building'],
    biography: 'Princeton graduate and communication coach. Specializes in preparing students for college interviews, helping them develop confidence and articulate their experiences effectively.',
    experience: 6,
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 130,
    specializations: ['Interview Prep', 'Communication Skills', 'Confidence Building', 'College Admissions'],
    languages: ['English'],
    responseTime: 'within 3 hours',
    totalSessions: 380,
    successStories: 73,
    isVerified: true,
    matchScore: 0.82,
    targetColleges: ['All Top Universities'],
    preferredStudentTypes: ['Interview preparation needed', 'Communication skills development', 'All backgrounds'],
    maxBudget: 150,
    minGPA: 3.2,
    minSAT: 1200,
    minACT: 25,
    expertiseAreas: ['Communication', 'Interview skills', 'Confidence building'],
    successRate: 91,
    availability: ['Flexible', 'Weekends'],
    communicationStyle: ['Encouraging', 'Supportive', 'Confidence-building'],
    strengths: ['Interview coaching', 'Communication skills', 'Confidence building']
  }
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [maxRate, setMaxRate] = useState('');
  const [minRating, setMinRating] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showProfile, setShowProfile] = useState(false);

  const apiSort = sortBy === 'match' ? 'rating' : sortBy === 'price' ? 'price' : sortBy === 'experience' ? 'experience' : 'rating';
  const { mentors: apiMentors, loading, error } = useMentors({
    search: searchTerm || undefined,
    specialization: selectedSpecialization !== 'all' ? selectedSpecialization : undefined,
    maxRate: maxRate || undefined,
    minRating: minRating !== 'all' ? minRating : undefined,
    sortBy: apiSort as any,
    sortOrder: 'desc',
    page: 1,
    limit: 12,
  });

  const specializations = [
    { id: 'all', name: 'All Specializations' },
    { id: 'College Admissions', name: 'College Admissions' },
    { id: 'Essay Writing', name: 'Essay Writing' },
    { id: 'Interview Prep', name: 'Interview Prep' },
    { id: 'STEM Applications', name: 'STEM Applications' },
    { id: 'Ivy League', name: 'Ivy League' },
    { id: 'Financial Aid', name: 'Financial Aid' },
    { id: 'Scholarship Applications', name: 'Scholarship Applications' },
    { id: 'Test Prep', name: 'Test Prep' },
    { id: 'Career Guidance', name: 'Career Guidance' }
  ];

  const calculateMatchScore = (mentor: Mentor, profile: StudentProfile): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (30% weight)
    if (profile.gpa >= (mentor.minGPA || 0)) {
      score += 30;
    }
    totalCriteria += 30;

    if (mentor.minSAT && profile.satScore >= mentor.minSAT) {
      score += 15;
    }
    totalCriteria += 15;

    if (mentor.minACT && profile.actScore >= mentor.minACT) {
      score += 15;
    }
    totalCriteria += 15;

    // Budget criteria (20% weight)
    if (mentor.maxBudget && profile.budget <= mentor.maxBudget) {
      score += 20;
    }
    totalCriteria += 20;

    // Specialization alignment (25% weight)
    const specializationMatch = mentor.specializations.some(spec => 
      profile.preferredSpecializations.includes(spec)
    );
    if (specializationMatch) {
      score += 25;
    }
    totalCriteria += 25;

    // Target college alignment (15% weight)
    if (mentor.targetColleges) {
      const collegeMatch = mentor.targetColleges.some(college => 
        profile.targetColleges.includes(college)
      );
      if (collegeMatch) {
        score += 15;
      }
    }
    totalCriteria += 15;

    // Student type preference (10% weight)
    if (mentor.preferredStudentTypes) {
      const typeMatch = mentor.preferredStudentTypes.some(type => {
        if (type === 'First-generation' && profile.firstGen) return true;
        if (type === 'Hispanic' && profile.ethnicity === 'Hispanic') return true;
        if (type === 'STEM-focused' && profile.intendedMajor.some(major => 
          ['Computer Science', 'Engineering', 'Physics', 'Chemistry', 'Biology'].includes(major)
        )) return true;
        return false;
      });
      if (typeMatch) {
        score += 10;
      }
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const filteredMentors = (apiMentors ?? mockMentors).filter(mentor => {
    const matchesSearch = mentor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === 'all' || mentor.specializations.includes(selectedSpecialization);
    const matchesRate = !maxRate || mentor.hourlyRate <= parseInt(maxRate);
    const matchesRating = minRating === 'all' || mentor.rating >= parseFloat(minRating);

    return matchesSearch && matchesSpecialization && matchesRate && matchesRating;
  }).map(mentor => ({
    ...mentor,
    matchScore: calculateMatchScore(mentor, mockStudentProfile) / 100
  }));

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.hourlyRate - b.hourlyRate;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const getMatchColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-100';
    if (score >= 0.7) return 'text-blue-600 bg-blue-100';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Protected>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">Path2Ivy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/colleges" className="text-gray-600 hover:text-blue-600 transition-colors">
                Colleges
              </Link>
              <Link href="/scholarships" className="text-gray-600 hover:text-blue-600 transition-colors">
                Scholarships
              </Link>
              <Link href="/extracurriculars" className="text-gray-600 hover:text-blue-600 transition-colors">
                Extracurriculars
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with Expert Mentors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from experienced counselors, admissions officers, and alumni 
            who have helped thousands of students achieve their college dreams.
          </p>
        </motion.div>

        {/* Student Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-sm border border-purple-200 p-6 mb-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Profile</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">GPA:</span>
                  <span className="font-medium ml-1">{mockStudentProfile.gpa}</span>
                </div>
                <div>
                  <span className="text-gray-600">SAT:</span>
                  <span className="font-medium ml-1">{mockStudentProfile.satScore}</span>
                </div>
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium ml-1">${mockStudentProfile.budget}/hr</span>
                </div>
                <div>
                  <span className="text-gray-600">Stage:</span>
                  <span className="font-medium ml-1 capitalize">{mockStudentProfile.applicationStage}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Target Colleges:</span> {mockStudentProfile.targetColleges.slice(0, 2).join(', ')}
                {mockStudentProfile.targetColleges.length > 2 && ` +${mockStudentProfile.targetColleges.length - 2} more`}
              </div>
            </div>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              {showProfile ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-purple-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Academic & Demographics</h4>
                  <div className="space-y-1 text-gray-600">
                    <div>ACT Score: {mockStudentProfile.actScore}</div>
                    <div>Family Income: ${mockStudentProfile.familyIncome.toLocaleString()}</div>
                    <div>Ethnicity: {mockStudentProfile.ethnicity}</div>
                    <div>First Generation: {mockStudentProfile.firstGen ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Experience & Preferences</h4>
                  <div className="space-y-1 text-gray-600">
                    <div>Community Service: {mockStudentProfile.communityService} hours</div>
                    <div>Research Experience: {mockStudentProfile.researchExperience ? 'Yes' : 'No'}</div>
                    <div>Leadership Roles: {mockStudentProfile.leadershipRoles.length}</div>
                    <div>Preferred Specializations: {mockStudentProfile.preferredSpecializations.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors by name, institution, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="match">Sort by Match %</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              {/* Specialization Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedSpecialization(spec.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSpecialization === spec.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {spec.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate and Rating Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Rate ($/hour)</label>
                  <input
                    type="number"
                    placeholder="Enter max rate..."
                    value={maxRate}
                    onChange={(e) => setMaxRate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Found <span className="font-semibold text-purple-600">{sortedMentors.length}</span> mentors
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            {loading && <span className="text-sm text-gray-500">Loading...</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`s-${i}`} />)}
          {error && (
            <div className="col-span-full text-red-600 text-sm">{error}</div>
          )}
          {sortedMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={mentor.profileImage}
                    alt={`${mentor.firstName} ${mentor.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {mentor.firstName} {mentor.lastName}
                          </h3>
                          {mentor.isVerified && (
                            <CheckCircleIcon className="w-5 h-5 text-blue-500 ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-blue-600 font-medium">{mentor.title}</p>
                        <p className="text-sm text-gray-500">{mentor.institution}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchColor(mentor.matchScore)}`}>
                        {Math.round(mentor.matchScore * 100)}% match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(mentor.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {mentor.rating} ({mentor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${mentor.hourlyRate}/hr</p>
                  </div>
                </div>

                {/* Experience and Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{mentor.experience}</p>
                    <p className="text-xs text-gray-500">Years Exp.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{mentor.totalSessions}</p>
                    <p className="text-xs text-gray-500">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{mentor.successStories}</p>
                    <p className="text-xs text-gray-500">Success</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {mentor.biography}
                </p>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.specializations.slice(0, 3).map((spec) => (
                      <span
                        key={spec}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {mentor.specializations.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        +{mentor.specializations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Responds {mentor.responseTime}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/mentors/${mentor.id}`}
                    className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block"
                  >
                    View Profile & Book
                  </Link>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedMentors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more mentors.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('all');
                setMaxRate('');
                setMinRating('all');
                setSortBy('match');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Our expert mentors can help you with essay writing, interview preparation, application strategy, and more. 
            Find the perfect mentor to guide your college admissions journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-white">
              Track Your Progress
            </Link>
            <Link href="/colleges" className="btn-ghost text-white border-white hover:bg-white hover:text-purple-600">
              Explore Colleges
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </Protected>
  );
}
