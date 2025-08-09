'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  BriefcaseIcon,
  BeakerIcon,
  StarIcon,
  GlobeAltIcon,
  ChartBarIcon,
  FilterIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Activity {
  id: string;
  title: string;
  category: 'volunteering' | 'competitions' | 'internships' | 'research' | 'leadership' | 'other';
  description: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  hoursPerWeek: number;
  totalHours: number;
  role: string;
  achievements: string[];
  skills: string[];
  isOngoing: boolean;
  impact: string;
  awards?: string[];
  supervisor?: string;
  supervisorContact?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Robotics Club President',
    category: 'leadership',
    description: 'Led a team of 15 students in designing and programming robots for competitions. Organized weekly meetings, managed budget, and mentored new members.',
    organization: 'High School Robotics Club',
    location: 'San Francisco, CA',
    startDate: '2023-09-01',
    endDate: '2024-06-01',
    hoursPerWeek: 8,
    totalHours: 320,
    role: 'President',
    achievements: [
      'Led team to 2nd place in regional competition',
      'Increased club membership by 40%',
      'Secured $5,000 in funding for new equipment'
    ],
    skills: ['Leadership', 'Project Management', 'Team Building', 'Technical Skills'],
    isOngoing: true,
    impact: 'Developed strong leadership skills while fostering interest in STEM among peers.'
  },
  {
    id: '2',
    title: 'Hospital Volunteer',
    category: 'volunteering',
    description: 'Assisted nurses and doctors in patient care, provided comfort to patients and families, and helped with administrative tasks.',
    organization: 'City General Hospital',
    location: 'San Francisco, CA',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    hoursPerWeek: 4,
    totalHours: 200,
    role: 'Volunteer',
    achievements: [
      'Completed 200 hours of service',
      'Received Outstanding Volunteer Award',
      'Helped over 500 patients and families'
    ],
    skills: ['Patient Care', 'Communication', 'Empathy', 'Medical Terminology'],
    isOngoing: false,
    impact: 'Gained valuable healthcare experience and developed strong interpersonal skills.'
  },
  {
    id: '3',
    title: 'Science Olympiad Team Captain',
    category: 'competitions',
    description: 'Competed in various science events including Chemistry Lab, Anatomy & Physiology, and Circuit Lab. Led team practices and strategy sessions.',
    organization: 'High School Science Olympiad',
    location: 'San Francisco, CA',
    startDate: '2023-10-01',
    endDate: '2024-03-15',
    hoursPerWeek: 6,
    totalHours: 120,
    role: 'Team Captain',
    achievements: [
      '1st place in Chemistry Lab at state competition',
      '2nd place overall team at regionals',
      'Qualified for state championship'
    ],
    skills: ['Scientific Research', 'Laboratory Techniques', 'Team Leadership', 'Problem Solving'],
    isOngoing: false,
    impact: 'Enhanced scientific knowledge and competitive spirit while leading a successful team.'
  },
  {
    id: '4',
    title: 'Tech Startup Intern',
    category: 'internships',
    description: 'Worked on front-end development using React and JavaScript. Collaborated with senior developers on real-world projects.',
    organization: 'InnovateTech Solutions',
    location: 'San Francisco, CA',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    hoursPerWeek: 20,
    totalHours: 240,
    role: 'Software Development Intern',
    achievements: [
      'Developed 3 new features for the main product',
      'Reduced loading time by 30%',
      'Received full-time offer for after graduation'
    ],
    skills: ['React', 'JavaScript', 'Git', 'Agile Development', 'Team Collaboration'],
    isOngoing: false,
    impact: 'Gained practical software development experience and confirmed interest in computer science.'
  },
  {
    id: '5',
    title: 'Cancer Research Assistant',
    category: 'research',
    description: 'Assisted in laboratory research on cancer cell behavior and drug resistance mechanisms. Conducted experiments and analyzed data.',
    organization: 'University of California, San Francisco',
    location: 'San Francisco, CA',
    startDate: '2023-07-01',
    endDate: '2024-01-31',
    hoursPerWeek: 10,
    totalHours: 280,
    role: 'Research Assistant',
    achievements: [
      'Co-authored research paper submitted to journal',
      'Presented findings at school science fair',
      'Developed new experimental protocol'
    ],
    skills: ['Laboratory Techniques', 'Data Analysis', 'Scientific Writing', 'Research Methods'],
    isOngoing: false,
    impact: 'Contributed to meaningful cancer research while developing strong analytical skills.'
  }
];

const categories = [
  { id: 'all', name: 'All Activities', icon: StarIcon, color: 'text-gray-600' },
  { id: 'volunteering', name: 'Volunteering', icon: HeartIcon, color: 'text-red-600' },
  { id: 'competitions', name: 'Competitions', icon: TrophyIcon, color: 'text-yellow-600' },
  { id: 'internships', name: 'Internships', icon: BriefcaseIcon, color: 'text-blue-600' },
  { id: 'research', name: 'Research', icon: BeakerIcon, color: 'text-purple-600' },
  { id: 'leadership', name: 'Leadership', icon: UserGroupIcon, color: 'text-green-600' },
  { id: 'other', name: 'Other', icon: AcademicCapIcon, color: 'text-indigo-600' }
];

export default function ExtracurricularsPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [sortBy, setSortBy] = useState('recent');

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'hours':
        return b.totalHours - a.totalHours;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'ongoing':
        return (b.isOngoing ? 1 : 0) - (a.isOngoing ? 1 : 0);
      default:
        return 0;
    }
  });

  const totalHours = activities.reduce((sum, activity) => sum + activity.totalHours, 0);
  const ongoingActivities = activities.filter(activity => activity.isOngoing).length;
  const completedActivities = activities.filter(activity => !activity.isOngoing).length;

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || StarIcon;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'text-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months;
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
            Track Your Extracurriculars
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Document your volunteering, competitions, internships, research, and leadership activities to strengthen your college applications.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{activities.length}</div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{totalHours}</div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{ongoingActivities}</div>
            <div className="text-sm text-gray-600">Ongoing</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{completedActivities}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
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
                <option value="recent">Sort by Recent</option>
                <option value="hours">Sort by Hours</option>
                <option value="title">Sort by Title</option>
                <option value="ongoing">Ongoing First</option>
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Activity
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(activity.category).replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <getCategoryIcon category={activity.category} className={`w-4 h-4 ${getCategoryColor(activity.category)}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">{activity.organization}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingActivity(activity)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setActivities(prev => prev.filter(a => a.id !== activity.id));
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {formatDate(activity.startDate)} - {activity.isOngoing ? 'Present' : formatDate(activity.endDate!)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{activity.totalHours} hours total</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{activity.role}</span>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {activity.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {activity.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <StarIcon className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                      {activity.achievements.length > 2 && (
                        <li className="text-sm text-blue-600">+{activity.achievements.length - 2} more achievements</li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {activity.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Developed:</h4>
                    <div className="flex flex-wrap gap-1">
                      {activity.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {activity.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{activity.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.isOngoing 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {activity.isOngoing ? 'Ongoing' : 'Completed'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {calculateDuration(activity.startDate, activity.endDate)} months
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600 mb-4">Start tracking your extracurricular activities to strengthen your college applications.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Add Your First Activity
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
          <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your extracurricular activities are a key part of your college application. Make sure to highlight your leadership, impact, and growth in your essays and interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-white">
              View Application Progress
            </Link>
            <Link href="/mentors" className="btn-ghost text-white border-white hover:bg-white hover:text-blue-600">
              Get Mentor Help
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


