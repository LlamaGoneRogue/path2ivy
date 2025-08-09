'use client';

import { useMemo, useState } from 'react';
import Protected from '@/components/Protected';
import { useColleges } from '@/hooks/useColleges';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  MapIcon, 
  SparklesIcon,
  GlobeAltIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
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
    maxFamilyIncome: 150000,
    states: ['California', 'All states'],
    leadershipRequired: true,
    communityServiceRequired: 40,
    researchExperience: false,
    extracurriculars: ['Business', 'Film', 'Leadership', 'Creative Arts']
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
    maxFamilyIncome: 90000,
    states: ['California', 'All states'],
    leadershipRequired: false,
    communityServiceRequired: 25,
    researchExperience: true,
    extracurriculars: ['STEM', 'Research', 'Community Service']
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
    maxFamilyIncome: 80000,
    states: ['California', 'All states'],
    leadershipRequired: false,
    communityServiceRequired: 20,
    researchExperience: false,
    extracurriculars: ['Engineering', 'Hands-on Learning', 'Practical Skills']
  }
];

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showProfile, setShowProfile] = useState(false);

  const { colleges: apiColleges, loading, error } = useColleges({
    search: searchTerm || undefined,
    region: selectedRegion !== 'all' ? selectedRegion : undefined,
    type: selectedType !== 'all' ? selectedType : undefined,
    page: 1,
    limit: 20,
  });

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

  const categories = [
    { id: 'all', name: 'All Categories', color: 'text-gray-600' },
    { id: 'safe', name: 'Safe', color: 'text-green-600' },
    { id: 'target', name: 'Target', color: 'text-blue-600' },
    { id: 'reach', name: 'Reach', color: 'text-orange-600' },
    { id: 'extremeReach', name: 'Extreme Reach', color: 'text-red-600' }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'West Coast', name: 'West Coast' },
    { id: 'Northeast', name: 'Northeast' },
    { id: 'Midwest', name: 'Midwest' },
    { id: 'South', name: 'South' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'public', name: 'Public' },
    { id: 'private', name: 'Private' }
  ];

  const filteredColleges = (apiColleges ?? mockColleges).filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || college.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || college.region === selectedRegion;
    const matchesType = selectedType === 'all' || college.type === selectedType;

    return matchesSearch && matchesCategory && matchesRegion && matchesType;
  }).map(college => ({
    ...college,
    matchScore: calculateMatchScore(college, mockStudentProfile) / 100
  }));

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'acceptance':
        return a.acceptanceRate - b.acceptanceRate;
      case 'tuition':
        return a.tuition - b.tuition;
      default:
        return 0;
    }
  });

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

  return (
    <Protected>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect College
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover colleges that match your academic profile, interests, and preferences. Our AI-powered matching system helps you find the right fit.
          </p>
        </motion.div>

        {/* Student Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200 p-6 mb-6"
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
                  <span className="text-gray-600">ACT:</span>
                  <span className="font-medium ml-1">{mockStudentProfile.actScore}</span>
                </div>
                <div>
                  <span className="text-gray-600">State:</span>
                  <span className="font-medium ml-1">{mockStudentProfile.state}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Intended Major:</span> {mockStudentProfile.intendedMajor.join(', ')}
              </div>
            </div>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showProfile ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-blue-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Academic & Demographics</h4>
                  <div className="space-y-1 text-gray-600">
                    <div>Family Income: ${mockStudentProfile.familyIncome.toLocaleString()}</div>
                    <div>Ethnicity: {mockStudentProfile.ethnicity}</div>
                    <div>First Generation: {mockStudentProfile.firstGen ? 'Yes' : 'No'}</div>
                    <div>Community Service: {mockStudentProfile.communityService} hours</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Leadership & Experience</h4>
                  <div className="space-y-1 text-gray-600">
                    <div>Leadership Roles: {mockStudentProfile.leadershipRoles.join(', ')}</div>
                    <div>Research Experience: {mockStudentProfile.researchExperience ? 'Yes' : 'No'}</div>
                    <div>Internship Experience: {mockStudentProfile.internshipExperience ? 'Yes' : 'No'}</div>
                    <div>Awards: {mockStudentProfile.awards.join(', ')}</div>
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
                  placeholder="Search colleges by name or location..."
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
                <option value="name">Sort by Name</option>
                <option value="acceptance">Sort by Acceptance Rate</option>
                <option value="tuition">Sort by Tuition</option>
              </select>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              {/* Category Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region and Type Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {regions.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {types.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
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
              Found <span className="font-semibold text-blue-600">{sortedColleges.length}</span> colleges
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            {loading && <span className="text-sm text-gray-500">Loading...</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </motion.div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`s-${i}`} />)}
          {error && (
            <div className="col-span-full text-red-600 text-sm">{error}</div>
          )}
          {sortedColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{college.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <MapIcon className="w-4 h-4" />
                      <span>{college.location}</span>
                      <span>•</span>
                      <span>{college.type.charAt(0).toUpperCase() + college.type.slice(1)}</span>
                      <span>•</span>
                      <span>{college.size.charAt(0).toUpperCase() + college.size.slice(1)}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(college.category)}`}>
                    {college.category.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Acceptance Rate</p>
                    <p className="font-medium">{college.acceptanceRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg GPA</p>
                    <p className="font-medium">{college.averageGPA}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg SAT</p>
                    <p className="font-medium">{college.averageSAT}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tuition</p>
                    <p className="font-medium">${college.tuition.toLocaleString()}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{college.description}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {highlight}
                      </span>
                    ))}
                    {college.highlights.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{college.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Score and Action */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(college.matchScore)}`}>
                    {Math.round(college.matchScore * 100)}% match
                  </span>
                  <Link 
                    href={`/colleges/${college.id}`}
                    className="btn-secondary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedColleges.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <AcademicCapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more colleges.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedRegion('all');
                setSelectedType('all');
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
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our expert mentors can help you evaluate colleges, understand admission requirements, and create a strategic application plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentors" className="btn-white">
              Find a Mentor
            </Link>
            <Link href="/dashboard" className="btn-ghost text-white border-white hover:bg-white hover:text-blue-600">
              Track Your Progress
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </Protected>
  );
}



