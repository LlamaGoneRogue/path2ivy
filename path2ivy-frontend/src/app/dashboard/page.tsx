'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FireIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  PlayIcon,
  ArrowRightIcon,
  BellIcon,
  MapPinIcon,
  CalendarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import Protected from '@/components/Protected';
import { useActionPlans } from '@/hooks/useActionPlans';
import { useEvents } from '@/hooks/useEvents';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDailyRoadmap } from '@/hooks/useDailyRoadmap';
import { useScholarshipMatch } from '@/hooks/useScholarshipMatch';
import { useTracker } from '@/hooks/useTracker';
import { useAgentStream, useAgentControls } from '@/hooks/useAgent';
import { useToast } from '@/components/ToastProvider';

// Mock data for demo - in real app this would come from API
const mockActionPlan = {
  date: new Date().toISOString(),
  tasks: [
    {
      id: '1',
      title: 'Complete Stanford Essay Draft',
      description: 'Write a 650-word essay responding to the "What matters to you and why?" prompt',
      category: 'essays',
      priority: 'high',
      estimatedTime: 90,
      completed: false
    },
    {
      id: '2',
      title: 'Research Merit Scholarships',
      description: 'Find 3 merit-based scholarships that match your academic profile',
      category: 'financial',
      priority: 'medium',
      estimatedTime: 45,
      completed: false
    },
    {
      id: '3',
      title: 'SAT Math Practice',
      description: 'Complete 20 practice problems focusing on algebra and functions',
      category: 'test-prep',
      priority: 'medium',
      estimatedTime: 30,
      completed: true
    },
    {
      id: '4',
      title: 'Update Activity List',
      description: 'Add recent leadership roles and achievements to your activity list',
      category: 'applications',
      priority: 'low',
      estimatedTime: 25,
      completed: false
    }
  ],
  insights: {
    strengths: ['Strong academic performance', 'Diverse extracurricular involvement'],
    improvements: ['Need to start essay writing', 'Consider taking SAT Subject Tests'],
    recommendations: ['Visit colleges virtually', 'Connect with current students']
  },
  collegeSpotlight: {
    name: 'MIT',
    reason: 'Great fit for your computer science interests and research experience',
    location: 'Cambridge, MA',
    acceptanceRate: 6.7,
    sponsored: false
  },
  scholarshipOpportunities: [
    {
      name: 'National Merit Scholarship',
      amount: 2500,
      deadline: '2024-04-01',
      eligibilityMatch: 85,
      url: '#'
    },
    {
      name: 'Hispanic Scholarship Fund',
      amount: 5000,
      deadline: '2024-03-15',
      eligibilityMatch: 92,
      url: '#'
    }
  ]
};

const mockProgress = {
  tasksCompleted: 23,
  totalTasks: 45,
  lastActivityDate: new Date(),
  achievementBadges: ['Early Bird', 'Essay Expert', 'Research Pro'],
  weeklyGoal: 8,
  weeklyCompleted: 5
};

const mockCollegeRecommendations = [
  {
    name: 'Stanford University',
    location: 'Stanford, CA',
    matchScore: 88,
    category: 'reach',
    reasons: ['Strong CS program', 'Research opportunities'],
    acceptanceRate: 4.3,
    estimatedCost: 78000
  },
  {
    name: 'UC Berkeley',
    location: 'Berkeley, CA',
    matchScore: 75,
    category: 'match',
    reasons: ['Excellent engineering', 'In-state tuition'],
    acceptanceRate: 17.5,
    estimatedCost: 45000
  },
  {
    name: 'Cal Poly SLO',
    location: 'San Luis Obispo, CA',
    matchScore: 92,
    category: 'safety',
    reasons: ['Strong hands-on programs', 'Good value'],
    acceptanceRate: 30.2,
    estimatedCost: 35000
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTasks, setCompletedTasks] = useState<string[]>(['3']);
  const { user, logout } = useAuth();
  const { actionPlans, loading: plansLoading, error: plansError } = useActionPlans();
  const { connected } = useEvents();
  const { profile, loading: profileLoading, error: profileError } = useUserProfile();
  const { tasks: dailyTasks } = useDailyRoadmap({});
  const { recommendations: scholarRecs, digest: scholarDigest } = useScholarshipMatch();
  const { tasks: trackerTasks, calendarIcsUrl } = useTracker();
  const { connected: agentConnected, digest: agentDigest } = useAgentStream();
  const { enable: enableAgent, disable: disableAgent, loading: agentLoading, error: agentError, config: agentConfig } = useAgentControls();
  const { push } = useToast();

  useEffect(() => {
    if (agentDigest?.digest) {
      const sCount = agentDigest.digest?.scholarships?.length || 0;
      const eCount = agentDigest.digest?.events?.length || 0;
      const iCount = agentDigest.digest?.internships?.length || 0;
      const total = sCount + eCount + iCount;
      if (total > 0) push(`Agent found ${total} new opportunities`, 'success');
    }
  }, [agentDigest, push]);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  const progressPercentage = (mockProgress.tasksCompleted / mockProgress.totalTasks) * 100;
  const weeklyProgressPercentage = (mockProgress.weeklyCompleted / mockProgress.weeklyGoal) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essays': return DocumentTextIcon;
      case 'financial': return BanknotesIcon;
      case 'test-prep': return AcademicCapIcon;
      case 'applications': return ClockIcon;
      default: return CheckCircleIcon;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essays': return 'text-purple-600 bg-purple-100';
      case 'financial': return 'text-green-600 bg-green-100';
      case 'test-prep': return 'text-blue-600 bg-blue-100';
      case 'applications': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Protected>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-blue-600">
                  Path2Ivy
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                  Dashboard
                </Link>
                <Link href="/mentors" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Find Mentors
                </Link>
                <Link href="/colleges" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Explore Colleges
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <BellIcon className="w-6 h-6" />
                {connected && (
                  <span className="absolute -top-0.5 -right-0.5 block w-2 h-2 bg-green-500 rounded-full" />
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">Free Plan</div>
                </div>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600">
              Here's your personalized college journey dashboard. Let's make today count!
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">{mockProgress.tasksCompleted}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progressPercentage)}% of total goals
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FireIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{mockProgress.weeklyCompleted}/{mockProgress.weeklyGoal}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="progress-bar">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${weeklyProgressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(weeklyProgressPercentage)}% weekly goal
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <StarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Achievement Badges</p>
                <p className="text-2xl font-bold text-gray-900">{mockProgress.achievementBadges.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-1">
                {mockProgress.achievementBadges.slice(0, 3).map((badge, index) => (
                  <span key={index} className="badge-primary text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Colleges Matched</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                3 reach • 6 match • 3 safety
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Action Plan */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Today's AI Roadmap</h3>
                </div>
                <span className="badge-primary">Daily plan</span>
              </div>

              <div className="space-y-4">
                {(dailyTasks || actionPlans?.[0]?.tasks || mockActionPlan.tasks).map((task: any, index: number) => {
                  const IconComponent = getCategoryIcon(task.category);
                  const isCompleted = completedTasks.includes(task.id) || task.status === 'completed';
                  
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(task.category)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className={`badge ${
                                task.priority === 'high' ? 'badge-error' :
                                task.priority === 'medium' ? 'badge-warning' : 'badge-success'
                              }`}>
                               {task.priority || 'medium'}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                 {(task.estimatedTime ?? 30)}m
                              </span>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                          {!isCompleted && (
                            <button
                              onClick={() => handleTaskComplete(task.id)}
                              className="mt-3 btn-primary btn-sm"
                            >
                              Mark Complete
                            </button>
                          )}
                          {isCompleted && (
                            <div className="flex items-center mt-3 text-green-600">
                              <CheckCircleIcon className="w-4 h-4 mr-1" />
                              <span className="text-sm font-medium">Completed!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full btn-primary">
                  Generate Next Steps
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
              {profileLoading && (
                <div className="space-y-2 text-sm text-gray-500">Loading profile...</div>
              )}
              {profileError && (
                <div className="text-sm text-red-600">{profileError}</div>
              )}
              {profile && (
                <div className="text-sm text-gray-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium">{profile.firstName} {profile.lastName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium truncate max-w-[60%] text-right">{profile.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Graduation Year</span>
                    <span className="font-medium">{profile?.profile?.graduationYear ?? '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">GPA</span>
                    <span className="font-medium">{profile?.profile?.gpa ?? '—'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Interests</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(profile?.profile?.interests ?? []).slice(0, 6).map((i: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{i}</span>
                      ))}
                      {(!profile?.profile?.interests || profile?.profile?.interests.length === 0) && (
                        <span className="text-gray-500">—</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Colleges</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(profile?.preferences?.targetColleges ?? []).slice(0, 6).map((c: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">{c}</span>
                      ))}
                      {(!profile?.preferences?.targetColleges || profile?.preferences?.targetColleges.length === 0) && (
                        <span className="text-gray-500">—</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            {/* College Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">College Spotlight</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">MIT</span>
                </div>
                <h4 className="font-semibold text-gray-900">{mockActionPlan.collegeSpotlight.name}</h4>
                <p className="text-sm text-gray-600 flex items-center justify-center mt-1">
                  <MapPinIcon className="w-3 h-3 mr-1" />
                  {mockActionPlan.collegeSpotlight.location}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {mockActionPlan.collegeSpotlight.acceptanceRate}% acceptance rate
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  {mockActionPlan.collegeSpotlight.reason}
                </p>
                <button className="btn-secondary btn-sm mt-4 w-full">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Scholarship Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scholarship Opportunities</h3>
              <div className="space-y-3">
                {(scholarRecs || mockActionPlan.scholarshipOpportunities).map((scholarship: any, index: number) => (
                  <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{scholarship.name}</h4>
                      {typeof scholarship.match === 'number' && (
                        <span className="badge-success">{Math.round(scholarship.match * 100)}% match</span>
                      )}
                    </div>
                    {scholarship.amount && (
                      <p className="text-sm text-green-700 font-medium">${scholarship.amount.toLocaleString()}</p>
                    )}
                    <p className="text-xs text-gray-600 flex items-center mt-1">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      Due: {new Date(scholarship.deadline).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/scholarships" className="btn-secondary btn-sm mt-4 w-full text-center">
                Find More Scholarships
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-ghost text-left p-3 rounded-lg hover:bg-gray-50">
                  <DocumentTextIcon className="w-5 h-5 inline mr-3 text-gray-400" />
                  Generate Essay Topics
                </button>
                <button className="w-full btn-ghost text-left p-3 rounded-lg hover:bg-gray-50">
                  <AcademicCapIcon className="w-5 h-5 inline mr-3 text-gray-400" />
                  Explore Colleges
                </button>
                <a href={calendarIcsUrl} className="w-full btn-ghost text-left p-3 rounded-lg hover:bg-gray-50">
                  <ChartBarIcon className="w-5 h-5 inline mr-3 text-gray-400" />
                  Add Deadlines to Calendar (ICS)
                </a>
              </div>
            </motion.div>

            {/* Discovery Agent (Premium) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Discovery Agent</h3>
                <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${agentConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  <span className={`w-2 h-2 rounded-full mr-1 ${agentConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {agentConnected ? 'Live' : 'Idle'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Continuously finds scholarships, events, and internships for you.</p>
              <div className="flex gap-2">
                <button disabled={agentLoading} onClick={() => enableAgent(['scholarships','events','internships'], 60)} className="btn-primary btn-sm disabled:opacity-50">{agentLoading ? 'Enabling…' : 'Enable'}</button>
                <button disabled={agentLoading} onClick={() => disableAgent()} className="btn-ghost btn-sm disabled:opacity-50">Disable</button>
              </div>
              {agentError && <div className="mt-2 text-xs text-red-600">{agentError}</div>}
              {/* Digest Preview */}
              {agentDigest?.digest && (
                <div className="mt-4 space-y-3">
                  {agentDigest.digest.scholarships?.slice(0,2).map((s: any) => (
                    <div key={s.id} className="p-2 bg-green-50 border border-green-200 rounded">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{s.name}</div>
                      <div className="text-xs text-gray-600">Due {new Date(s.deadline).toLocaleDateString()}</div>
                    </div>
                  ))}
                  {agentDigest.digest.events?.slice(0,1).map((ev: any) => (
                    <div key={ev.id} className="p-2 bg-blue-50 border border-blue-200 rounded">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{ev.title}</div>
                      <div className="text-xs text-gray-600">{new Date(ev.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="card mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SparklesIcon className="w-5 h-5 mr-2 text-primary-600" />
            AI Insights for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Your Strengths</h4>
              <ul className="space-y-1">
                {mockActionPlan.insights.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-700 mb-2">Areas to Improve</h4>
              <ul className="space-y-1">
                {mockActionPlan.insights.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <ClockIcon className="w-4 h-4 text-orange-500 mr-2" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {mockActionPlan.insights.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <StarIcon className="w-4 h-4 text-blue-500 mr-2" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </Protected>
  );
}
