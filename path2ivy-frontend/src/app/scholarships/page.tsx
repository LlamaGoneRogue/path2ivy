'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  BookmarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  UserIcon,
  DocumentTextIcon,
  BanknotesIcon,
  TrophyIcon,
  UserCircleIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface StudentProfile {
  gpa: number;
  satScore?: number;
  actScore?: number;
  familyIncome: number;
  state: string;
  ethnicity: string;
  gender: string;
  firstGen: boolean;
  intendedMajor: string[];
  extracurriculars: string[];
  leadershipRoles: string[];
  communityService: number; // hours per year
  workExperience: boolean;
  militaryService: boolean;
  disability: boolean;
  ruralArea: boolean;
  urbanArea: boolean;
  highSchoolType: 'public' | 'private' | 'charter' | 'homeschool';
  classRank?: number;
  classSize?: number;
}

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  eligibilityMatch: number;
  category: string;
  location: string;
  requirements: string[];
  description: string;
  url: string;
  isBookmarked: boolean;
  applicationType: 'essay' | 'video' | 'portfolio' | 'interview' | 'simple';
  renewable: boolean;
  gpa: number;
  satScore?: number;
  actScore?: number;
  majors: string[];
  ethnicity?: string;
  gender?: string;
  firstGen?: boolean;
  needBased: boolean;
  meritBased: boolean;
  // Enhanced criteria
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
  satScore: 1450,
  actScore: 32,
  familyIncome: 65000,
  state: 'California',
  ethnicity: 'Hispanic',
  gender: 'Female',
  firstGen: true,
  intendedMajor: ['Computer Science', 'Engineering'],
  extracurriculars: ['Robotics Club', 'Science Olympiad', 'Volunteer Work'],
  leadershipRoles: ['Robotics Club President', 'Student Council'],
  communityService: 120,
  workExperience: true,
  militaryService: false,
  disability: false,
  ruralArea: false,
  urbanArea: true,
  highSchoolType: 'public',
  classRank: 15,
  classSize: 450
};

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'National Merit Scholarship',
    amount: 2500,
    deadline: '2024-04-01',
    eligibilityMatch: 85,
    category: 'Merit-based',
    location: 'National',
    requirements: ['PSAT/NMSQT qualifying score', 'U.S. citizen or permanent resident', 'High school senior'],
    description: 'Prestigious scholarship program recognizing academic excellence through PSAT/NMSQT performance.',
    url: 'https://www.nationalmerit.org',
    isBookmarked: false,
    applicationType: 'simple',
    renewable: false,
    gpa: 3.8,
    satScore: 1400,
    majors: ['All majors'],
    needBased: false,
    meritBased: true
  },
  {
    id: '2',
    name: 'Hispanic Scholarship Fund',
    amount: 5000,
    deadline: '2024-03-15',
    eligibilityMatch: 92,
    category: 'Ethnicity-based',
    location: 'National',
    requirements: ['Hispanic heritage', 'Minimum 3.0 GPA', 'U.S. citizen or DACA recipient', 'Full-time enrollment'],
    description: 'Supporting Hispanic students in their pursuit of higher education through financial assistance.',
    url: 'https://www.hsf.net',
    isBookmarked: true,
    applicationType: 'essay',
    renewable: true,
    gpa: 3.0,
    majors: ['All majors'],
    ethnicity: 'Hispanic',
    needBased: true,
    meritBased: true,
    maxFamilyIncome: 75000
  },
  {
    id: '3',
    name: 'Gates Millennium Scholars Program',
    amount: 50000,
    deadline: '2024-01-15',
    eligibilityMatch: 78,
    category: 'Leadership',
    location: 'National',
    requirements: ['African American, American Indian/Alaska Native, Asian Pacific Islander American, or Hispanic American', 'Minimum 3.3 GPA', 'Demonstrated leadership abilities'],
    description: 'Comprehensive scholarship program for outstanding minority students with leadership potential.',
    url: 'https://www.gmsp.org',
    isBookmarked: false,
    applicationType: 'essay',
    renewable: true,
    gpa: 3.3,
    majors: ['All majors'],
    ethnicity: 'Hispanic',
    needBased: true,
    meritBased: true,
    maxFamilyIncome: 80000,
    leadershipRequired: true,
    firstGen: true
  },
  {
    id: '4',
    name: 'Coca-Cola Scholars Program',
    amount: 20000,
    deadline: '2024-10-31',
    eligibilityMatch: 65,
    category: 'Leadership',
    location: 'National',
    requirements: ['High school senior', 'Minimum 3.0 GPA', 'Demonstrated leadership in school and community'],
    description: 'Recognizing and rewarding leadership, academic excellence, and commitment to community service.',
    url: 'https://www.coca-colascholars.org',
    isBookmarked: false,
    applicationType: 'essay',
    renewable: false,
    gpa: 3.0,
    majors: ['All majors'],
    needBased: false,
    meritBased: true,
    leadershipRequired: true,
    communityServiceRequired: 100
  },
  {
    id: '5',
    name: 'Dell Scholars Program',
    amount: 20000,
    deadline: '2024-12-01',
    eligibilityMatch: 88,
    category: 'Need-based',
    location: 'National',
    requirements: ['Participate in approved college readiness program', 'Demonstrate financial need', 'Minimum 2.4 GPA'],
    description: 'Supporting students who have overcome significant obstacles to pursue higher education.',
    url: 'https://www.dellscholars.org',
    isBookmarked: true,
    applicationType: 'essay',
    renewable: true,
    gpa: 2.4,
    majors: ['All majors'],
    firstGen: true,
    needBased: true,
    meritBased: false,
    maxFamilyIncome: 70000
  },
  {
    id: '6',
    name: 'Jack Kent Cooke Foundation Scholarship',
    amount: 40000,
    deadline: '2024-11-20',
    eligibilityMatch: 72,
    category: 'Merit-based',
    location: 'National',
    requirements: ['Exceptional academic achievement', 'Demonstrated financial need', 'Strong leadership and service'],
    description: 'Comprehensive scholarship for high-achieving students with financial need.',
    url: 'https://www.jkcf.org',
    isBookmarked: false,
    applicationType: 'essay',
    renewable: true,
    gpa: 3.8,
    satScore: 1400,
    majors: ['All majors'],
    needBased: true,
    meritBased: true,
    maxFamilyIncome: 95000
  },
  {
    id: '7',
    name: 'California State University Trustees Award',
    amount: 12000,
    deadline: '2024-02-01',
    eligibilityMatch: 95,
    category: 'State-based',
    location: 'California',
    requirements: ['California resident', 'High academic achievement', 'Financial need'],
    description: 'Merit-based scholarship for outstanding California students attending CSU campuses.',
    url: 'https://www.calstate.edu',
    isBookmarked: false,
    applicationType: 'simple',
    renewable: true,
    gpa: 3.5,
    majors: ['All majors'],
    states: ['California'],
    needBased: true,
    meritBased: true,
    maxFamilyIncome: 80000
  },
  {
    id: '8',
    name: 'First Generation College Student Scholarship',
    amount: 8000,
    deadline: '2024-03-30',
    eligibilityMatch: 98,
    category: 'First Generation',
    location: 'National',
    requirements: ['First-generation college student', 'Demonstrated financial need', 'Strong academic record'],
    description: 'Supporting first-generation students in their pursuit of higher education.',
    url: 'https://www.firstgen.org',
    isBookmarked: false,
    applicationType: 'essay',
    renewable: true,
    gpa: 3.2,
    majors: ['All majors'],
    firstGen: true,
    needBased: true,
    meritBased: false,
    maxFamilyIncome: 75000
  }
];

const categories = [
  'All Categories',
  'Merit-based',
  'Need-based',
  'Leadership',
  'Ethnicity-based',
  'First Generation',
  'State-based',
  'STEM',
  'Arts',
  'Athletics'
];

const locations = [
  'All Locations',
  'National',
  'State',
  'Local',
  'International'
];

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(mockStudentProfile);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

  const majors = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts', 'Humanities', 'Social Sciences', 'Natural Sciences'];

  // Enhanced matching algorithm
  const calculateMatchScore = (scholarship: Scholarship, profile: StudentProfile): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (40% weight)
    if (profile.gpa >= scholarship.gpa) {
      score += 40;
    }
    totalCriteria += 40;

    if (scholarship.satScore && profile.satScore) {
      if (profile.satScore >= scholarship.satScore) {
        score += 20;
      }
      totalCriteria += 20;
    }

    if (scholarship.actScore && profile.actScore) {
      if (profile.actScore >= scholarship.actScore) {
        score += 20;
      }
      totalCriteria += 20;
    }

    // Financial criteria (25% weight)
    if (scholarship.maxFamilyIncome && profile.familyIncome <= scholarship.maxFamilyIncome) {
      score += 25;
    }
    totalCriteria += 25;

    // Geographic criteria (15% weight)
    if (scholarship.states && scholarship.states.includes(profile.state)) {
      score += 15;
    } else if (!scholarship.states) {
      score += 15; // National scholarships
    }
    totalCriteria += 15;

    // Demographic criteria (20% weight)
    if (scholarship.ethnicity && scholarship.ethnicity === profile.ethnicity) {
      score += 10;
    }
    totalCriteria += 10;

    if (scholarship.firstGen && profile.firstGen) {
      score += 10;
    }
    totalCriteria += 10;

    // Major criteria (10% weight)
    if (scholarship.majors.includes('All majors') || 
        profile.intendedMajor.some(major => scholarship.majors.includes(major))) {
      score += 10;
    }
    totalCriteria += 10;

    // Leadership criteria (10% weight)
    if (scholarship.leadershipRequired && profile.leadershipRoles.length > 0) {
      score += 10;
    }
    totalCriteria += 10;

    // Community service criteria (10% weight)
    if (scholarship.communityServiceRequired && profile.communityService >= scholarship.communityServiceRequired) {
      score += 10;
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || scholarship.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All Locations' || scholarship.location === selectedLocation;
    const matchesAmount = (!minAmount || scholarship.amount >= parseInt(minAmount)) &&
                         (!maxAmount || scholarship.amount <= parseInt(maxAmount));
    const matchesMajors = selectedMajors.length === 0 || 
                         selectedMajors.some(major => scholarship.majors.includes(major) || scholarship.majors.includes('All majors'));

    return matchesSearch && matchesCategory && matchesLocation && matchesAmount && matchesMajors;
  });

  // Update match scores based on student profile
  const scholarshipsWithScores = filteredScholarships.map(scholarship => ({
    ...scholarship,
    eligibilityMatch: calculateMatchScore(scholarship, studentProfile)
  }));

  const sortedScholarships = [...scholarshipsWithScores].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.eligibilityMatch - a.eligibilityMatch;
      case 'amount':
        return b.amount - a.amount;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleBookmark = (scholarshipId: string) => {
    setScholarships(prev => prev.map(scholarship => 
      scholarship.id === scholarshipId 
        ? { ...scholarship, isBookmarked: !scholarship.isBookmarked }
        : scholarship
    ));
  };

  const getApplicationTypeColor = (type: string) => {
    switch (type) {
      case 'essay': return 'text-blue-600 bg-blue-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'portfolio': return 'text-green-600 bg-green-100';
      case 'interview': return 'text-orange-600 bg-orange-100';
      case 'simple': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 75) return 'text-blue-600 bg-blue-100';
    if (match >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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
              <Link href="/colleges" className="text-gray-600 hover:text-blue-600 transition-colors">
                Colleges
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
            Find Your Perfect Scholarships
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover financial aid opportunities tailored to your profile. Our AI-powered matching system helps you find scholarships you're most likely to win.
          </p>
        </motion.div>

        {/* Student Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Profile</h2>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="btn-secondary btn-sm flex items-center"
            >
              <CogIcon className="w-4 h-4 mr-2" />
              {showProfile ? 'Hide Details' : 'Edit Profile'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">GPA</p>
              <p className="font-medium">{studentProfile.gpa}</p>
            </div>
            <div>
              <p className="text-gray-600">SAT Score</p>
              <p className="font-medium">{studentProfile.satScore || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">State</p>
              <p className="font-medium">{studentProfile.state}</p>
            </div>
            <div>
              <p className="text-gray-600">Family Income</p>
              <p className="font-medium">${studentProfile.familyIncome.toLocaleString()}</p>
            </div>
          </div>

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Academic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPA:</span>
                      <span className="font-medium">{studentProfile.gpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SAT Score:</span>
                      <span className="font-medium">{studentProfile.satScore || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ACT Score:</span>
                      <span className="font-medium">{studentProfile.actScore || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class Rank:</span>
                      <span className="font-medium">{studentProfile.classRank ? `${studentProfile.classRank}/${studentProfile.classSize}` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Demographic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ethnicity:</span>
                      <span className="font-medium">{studentProfile.ethnicity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Generation:</span>
                      <span className="font-medium">{studentProfile.firstGen ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium">{studentProfile.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family Income:</span>
                      <span className="font-medium">${studentProfile.familyIncome.toLocaleString()}</span>
                    </div>
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scholarships by name, description, or requirements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="match">Sort by Match %</option>
                <option value="amount">Sort by Amount</option>
                <option value="deadline">Sort by Deadline</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Amount Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount</label>
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount</label>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Major Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Majors</label>
                <div className="flex flex-wrap gap-2">
                  {majors.map(major => (
                    <button
                      key={major}
                      onClick={() => {
                        setSelectedMajors(prev => 
                          prev.includes(major) 
                            ? prev.filter(m => m !== major)
                            : [...prev, major]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedMajors.includes(major)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {major}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{sortedScholarships.length}</span> scholarships
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedScholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{scholarship.location}</span>
                      <span>•</span>
                      <span>{scholarship.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(scholarship.id)}
                    className={`p-2 rounded-full transition-colors ${
                      scholarship.isBookmarked 
                        ? 'text-yellow-500 hover:text-yellow-600' 
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Amount and Match */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      ${scholarship.amount.toLocaleString()}
                    </span>
                    {scholarship.renewable && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        Renewable
                      </span>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(scholarship.eligibilityMatch)}`}>
                    {scholarship.eligibilityMatch}% match
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scholarship.description}</p>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</h4>
                  <div className="space-y-1">
                    {scholarship.requirements.slice(0, 3).map((requirement, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{requirement}</span>
                      </div>
                    ))}
                    {scholarship.requirements.length > 3 && (
                      <div className="text-sm text-blue-600">+{scholarship.requirements.length - 3} more requirements</div>
                    )}
                  </div>
                </div>

                {/* Application Type and Deadline */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationTypeColor(scholarship.applicationType)}`}>
                      {scholarship.applicationType.charAt(0).toUpperCase() + scholarship.applicationType.slice(1)} Application
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Due: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <a
                    href={scholarship.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary btn-sm"
                  >
                    Apply Now
                  </a>
                  <Link href={`/scholarships/${scholarship.id}`} className="btn-secondary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedScholarships.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more opportunities.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setSelectedLocation('All Locations');
                setMinAmount('');
                setMaxAmount('');
                setSelectedMajors([]);
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Need Help with Applications?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Connect with our expert mentors who specialize in scholarship applications and essay writing. 
            Get personalized guidance to maximize your chances of winning.
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
  );
}
