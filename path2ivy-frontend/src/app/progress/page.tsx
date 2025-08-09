'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  StarIcon,
  TrophyIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  SparklesIcon,
  LightBulbIcon,
  TargetIcon,
  TrendingUpIcon,
  CalendarDaysIcon,
  FireIcon,
  RocketLaunchIcon,
  BeakerIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Protected from '@/components/Protected';

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'extracurricular' | 'application' | 'financial' | 'research';
  targetDate: string;
  completedDate?: string;
  isCompleted: boolean;
  isOverdue: boolean;
  priority: 'high' | 'medium' | 'low';
  tasks: Task[];
  progress: number; // 0-100
}

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string;
  estimatedHours: number;
  actualHours?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  earnedDate: string;
  points: number;
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  isActive: boolean;
  isCompleted: boolean;
  progress: number;
}

const mockRoadmap: RoadmapPhase[] = [
  {
    id: 'phase-1',
    title: 'Foundation Building',
    description: 'Strengthen academic foundation and explore interests',
    startDate: '2023-09-01',
    endDate: '2024-01-31',
    isActive: true,
    isCompleted: true,
    progress: 100,
    milestones: [
      {
        id: 'm1',
        title: 'Maintain Strong GPA',
        description: 'Keep GPA above 3.8 throughout the semester',
        category: 'academic',
        targetDate: '2024-01-31',
        completedDate: '2024-01-15',
        isCompleted: true,
        isOverdue: false,
        priority: 'high',
        progress: 100,
        tasks: [
          { id: 't1', title: 'Complete all assignments on time', description: 'Submit all homework and projects by deadlines', isCompleted: true, estimatedHours: 2 },
          { id: 't2', title: 'Study for final exams', description: 'Prepare thoroughly for end-of-semester exams', isCompleted: true, estimatedHours: 20 },
          { id: 't3', title: 'Meet with teachers for recommendations', description: 'Build relationships with teachers for future letters', isCompleted: true, estimatedHours: 1 }
        ]
      },
      {
        id: 'm2',
        title: 'Join Leadership Role',
        description: 'Take on a leadership position in an extracurricular activity',
        category: 'extracurricular',
        targetDate: '2024-01-31',
        completedDate: '2023-11-15',
        isCompleted: true,
        isOverdue: false,
        priority: 'high',
        progress: 100,
        tasks: [
          { id: 't4', title: 'Run for Robotics Club President', description: 'Campaign and win election for club leadership', isCompleted: true, estimatedHours: 5 },
          { id: 't5', title: 'Develop leadership skills', description: 'Attend leadership workshops and training', isCompleted: true, estimatedHours: 10 }
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Application Preparation',
    description: 'Prepare college applications and essays',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    isActive: true,
    isCompleted: false,
    progress: 65,
    milestones: [
      {
        id: 'm3',
        title: 'Research Target Colleges',
        description: 'Identify and research 8-12 colleges that match your profile',
        category: 'research',
        targetDate: '2024-03-31',
        completedDate: '2024-03-15',
        isCompleted: true,
        isOverdue: false,
        priority: 'high',
        progress: 100,
        tasks: [
          { id: 't6', title: 'Create college list', description: 'Research and compile list of target schools', isCompleted: true, estimatedHours: 8 },
          { id: 't7', title: 'Visit campuses', description: 'Schedule and attend campus tours', isCompleted: true, estimatedHours: 16 },
          { id: 't8', title: 'Compare financial aid', description: 'Analyze costs and financial aid packages', isCompleted: true, estimatedHours: 4 }
        ]
      },
      {
        id: 'm4',
        title: 'Write Personal Statement',
        description: 'Complete compelling personal statement for college applications',
        category: 'application',
        targetDate: '2024-05-31',
        completedDate: undefined,
        isCompleted: false,
        isOverdue: false,
        priority: 'high',
        progress: 60,
        tasks: [
          { id: 't9', title: 'Brainstorm essay topics', description: 'Generate and refine potential essay themes', isCompleted: true, estimatedHours: 3 },
          { id: 't10', title: 'Write first draft', description: 'Complete initial draft of personal statement', isCompleted: true, estimatedHours: 8 },
          { id: 't11', title: 'Revise and edit', description: 'Polish essay through multiple revisions', isCompleted: false, estimatedHours: 6 },
          { id: 't12', title: 'Get feedback', description: 'Have essay reviewed by teachers and mentors', isCompleted: false, estimatedHours: 2 }
        ]
      },
      {
        id: 'm5',
        title: 'Apply to Scholarships',
        description: 'Submit applications for 10-15 scholarships',
        category: 'financial',
        targetDate: '2024-06-30',
        completedDate: undefined,
        isCompleted: false,
        isOverdue: false,
        priority: 'medium',
        progress: 40,
        tasks: [
          { id: 't13', title: 'Research scholarship opportunities', description: 'Find scholarships that match your profile', isCompleted: true, estimatedHours: 4 },
          { id: 't14', title: 'Prepare scholarship essays', description: 'Write compelling scholarship application essays', isCompleted: true, estimatedHours: 12 },
          { id: 't15', title: 'Submit applications', description: 'Complete and submit scholarship applications', isCompleted: false, estimatedHours: 8 },
          { id: 't16', title: 'Follow up on applications', description: 'Track application status and respond to requests', isCompleted: false, estimatedHours: 2 }
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Final Submission',
    description: 'Submit applications and prepare for decisions',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    isActive: false,
    isCompleted: false,
    progress: 0,
    milestones: [
      {
        id: 'm6',
        title: 'Submit Early Applications',
        description: 'Complete and submit Early Decision/Early Action applications',
        category: 'application',
        targetDate: '2024-11-15',
        completedDate: undefined,
        isCompleted: false,
        isOverdue: false,
        priority: 'high',
        progress: 0,
        tasks: [
          { id: 't17', title: 'Finalize application materials', description: 'Complete all required application components', isCompleted: false, estimatedHours: 10 },
          { id: 't18', title: 'Request recommendations', description: 'Ask teachers for letters of recommendation', isCompleted: false, estimatedHours: 2 },
          { id: 't19', title: 'Submit applications', description: 'Complete and submit all early applications', isCompleted: false, estimatedHours: 4 }
        ]
      },
      {
        id: 'm7',
        title: 'Prepare for Interviews',
        description: 'Practice and prepare for college interviews',
        category: 'application',
        targetDate: '2024-12-31',
        completedDate: undefined,
        isCompleted: false,
        isOverdue: false,
        priority: 'medium',
        progress: 0,
        tasks: [
          { id: 't20', title: 'Research interview formats', description: 'Learn about different interview types and expectations', isCompleted: false, estimatedHours: 2 },
          { id: 't21', title: 'Practice common questions', description: 'Prepare responses to typical interview questions', isCompleted: false, estimatedHours: 4 },
          { id: 't22', title: 'Conduct mock interviews', description: 'Practice with mentors or family members', isCompleted: false, estimatedHours: 3 }
        ]
      }
    ]
  }
];

const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Academic Excellence',
    description: 'Maintained 3.8+ GPA for two consecutive semesters',
    icon: AcademicCapIcon,
    category: 'academic',
    earnedDate: '2024-01-15',
    points: 100
  },
  {
    id: 'a2',
    title: 'Leadership Pioneer',
    description: 'Elected to leadership position in extracurricular activity',
    icon: UserGroupIcon,
    category: 'extracurricular',
    earnedDate: '2023-11-15',
    points: 150
  },
  {
    id: 'a3',
    title: 'Research Enthusiast',
    description: 'Completed first research project with measurable impact',
    icon: BeakerIcon,
    category: 'research',
    earnedDate: '2024-01-31',
    points: 200
  },
  {
    id: 'a4',
    title: 'Community Champion',
    description: 'Completed 100+ hours of community service',
    icon: HeartIcon,
    category: 'volunteering',
    earnedDate: '2024-02-28',
    points: 125
  },
  {
    id: 'a5',
    title: 'Scholarship Hunter',
    description: 'Applied to 10+ scholarships in one month',
    icon: CurrencyDollarIcon,
    category: 'financial',
    earnedDate: '2024-03-15',
    points: 175
  }
];

export default function ProgressPage() {
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(mockRoadmap);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-2');
  const [showCompleted, setShowCompleted] = useState(true);

  const currentPhase = roadmap.find(phase => phase.id === selectedPhase);
  const totalProgress = roadmap.reduce((sum, phase) => sum + phase.progress, 0) / roadmap.length;
  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const completedMilestones = roadmap.flatMap(phase => phase.milestones).filter(m => m.isCompleted).length;
  const totalMilestones = roadmap.flatMap(phase => phase.milestones).length;
  const overdueTasks = roadmap.flatMap(phase => phase.milestones).flatMap(m => m.tasks).filter(t => !t.isCompleted && t.dueDate && new Date(t.dueDate) < new Date()).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return AcademicCapIcon;
      case 'extracurricular': return UserGroupIcon;
      case 'application': return DocumentTextIcon;
      case 'financial': return CurrencyDollarIcon;
      case 'research': return BeakerIcon;
      default: return StarIcon;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'extracurricular': return 'text-green-600 bg-green-100';
      case 'application': return 'text-purple-600 bg-purple-100';
      case 'financial': return 'text-yellow-600 bg-yellow-100';
      case 'research': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
            Your AI-Powered Progress
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your journey through our personalized roadmap and celebrate your achievements along the way.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedMilestones}/{totalMilestones}</div>
            <div className="text-sm text-gray-600">Milestones Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{totalPoints}</div>
            <div className="text-sm text-gray-600">Achievement Points</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{overdueTasks}</div>
            <div className="text-sm text-gray-600">Overdue Tasks</div>
          </div>
        </motion.div>

        {/* Roadmap Phases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {roadmap.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  selectedPhase === phase.id
                    ? 'bg-blue-600 text-white'
                    : phase.isCompleted
                    ? 'bg-green-100 text-green-700'
                    : phase.isActive
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-current"></div>
                <span>{phase.title}</span>
                {phase.isCompleted && <CheckCircleIcon className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Current Phase Details */}
        {currentPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Phase Overview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentPhase.title}</h2>
                <p className="text-gray-600 mb-6">{currentPhase.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{currentPhase.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentPhase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Start Date</p>
                      <p className="font-medium">{formatDate(currentPhase.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">End Date</p>
                      <p className="font-medium">{formatDate(currentPhase.endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentPhase.isCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : currentPhase.isActive 
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {currentPhase.isCompleted ? 'Completed' : currentPhase.isActive ? 'Active' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Milestones</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showCompleted}
                      onChange={(e) => setShowCompleted(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Show completed</span>
                  </label>
                </div>
                
                <div className="space-y-4">
                  {currentPhase.milestones
                    .filter(milestone => showCompleted || !milestone.isCompleted)
                    .map((milestone, index) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className={`p-4 rounded-lg border ${
                        milestone.isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : milestone.isOverdue 
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {milestone.isCompleted ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            ) : milestone.isOverdue ? (
                              <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                            ) : (
                              <ClockIcon className="w-5 h-5 text-gray-400" />
                            )}
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className={`px-2 py-1 rounded-full ${getPriorityColor(milestone.priority)}`}>
                              {milestone.priority} priority
                            </span>
                            <span className={`px-2 py-1 rounded-full ${getCategoryColor(milestone.category)}`}>
                              {milestone.category}
                            </span>
                            <span className="text-gray-500">
                              Due: {formatDate(milestone.targetDate)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{milestone.progress}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className={`h-1 rounded-full transition-all duration-300 ${
                                milestone.isCompleted ? 'bg-green-600' : 'bg-blue-600'
                              }`}
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tasks */}
                      <div className="mt-4 space-y-2">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div key={task.id} className="flex items-center space-x-3 text-sm">
                            {task.isCompleted ? (
                              <CheckCircleIcon className="w-4 h-4 text-green-600" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            )}
                            <span className={`flex-1 ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                              {task.title}
                            </span>
                            <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{formatDate(achievement.earnedDate)}</span>
                  <span className="text-sm font-medium text-blue-600">+{achievement.points} pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay on Track!</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your AI-powered roadmap is designed to maximize your chances of college admission. Keep up the great work and don't hesitate to ask for help when needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-white">
              View Dashboard
            </Link>
            <Link href="/mentors" className="btn-ghost text-white border-white hover:bg-white hover:text-blue-600">
              Get Mentor Help
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </Protected>
  );
}
