'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  MapPinIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
  GlobeAltIcon,
  StarIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentIcon,
  AcademicCapIcon as AcademicCapSolidIcon
} from '@heroicons/react/24/outline';
import {
  BookmarkIcon as BookmarkSolidIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  applicationSteps: string[];
  tips: string[];
  documents: string[];
  essayPrompts?: string[];
  interviewQuestions?: string[];
}

const mockScholarship: Scholarship = {
  id: '1',
  name: 'National Merit Scholarship',
  amount: 2500,
  deadline: '2024-04-01',
  eligibilityMatch: 85,
  category: 'Merit-based',
  location: 'National',
  requirements: [
    'PSAT/NMSQT qualifying score',
    'U.S. citizen or permanent resident',
    'High school senior',
    'Enrolled in an accredited U.S. high school',
    'Planning to enroll full-time in college'
  ],
  description: 'The National Merit Scholarship Program is one of the most prestigious academic scholarship programs in the United States. It recognizes and rewards the most academically talented high school students through a rigorous selection process based on PSAT/NMSQT performance.',
  url: 'https://www.nationalmerit.org',
  isBookmarked: false,
  applicationType: 'simple',
  renewable: false,
  gpa: 3.8,
  satScore: 1400,
  majors: ['All majors'],
  needBased: false,
  meritBased: true,
  applicationSteps: [
    'Take the PSAT/NMSQT in your junior year',
    'Achieve a qualifying score (varies by state)',
    'Complete the National Merit Scholarship application',
    'Submit required documentation',
    'Wait for notification of selection'
  ],
  tips: [
    'Start preparing for the PSAT/NMSQT early in your sophomore year',
    'Focus on improving your critical reading and math skills',
    'Take practice tests to familiarize yourself with the format',
    'Maintain a strong academic record throughout high school',
    'Consider taking the PSAT/NMSQT multiple times if needed'
  ],
  documents: [
    'PSAT/NMSQT score report',
    'High school transcript',
    'Proof of U.S. citizenship or permanent residency',
    'College enrollment verification (if selected)',
    'Financial information form'
  ],
  essayPrompts: [
    'Describe a significant challenge you have faced and how you overcame it.',
    'Discuss an accomplishment or event that marked your transition from childhood to adulthood.',
    'Explain how a particular experience has influenced your academic or career goals.'
  ]
};

export default function ScholarshipDetailPage() {
  const params = useParams();
  const [scholarship, setScholarship] = useState<Scholarship>(mockScholarship);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleBookmark = () => {
    setScholarship(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const getApplicationTypeIcon = (type: string) => {
    switch (type) {
      case 'essay': return DocumentTextIcon;
      case 'video': return UserIcon;
      case 'portfolio': return AcademicCapIcon;
      case 'interview': return UserIcon;
      case 'simple': return CheckCircleIcon;
      default: return DocumentTextIcon;
    }
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

  const daysUntilDeadline = Math.ceil((new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/scholarships" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Scholarships
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{scholarship.name}</h1>
                <button
                  onClick={toggleBookmark}
                  className="p-2 rounded-full transition-colors hover:bg-gray-100"
                >
                  {scholarship.isBookmarked ? (
                    <BookmarkSolidIcon className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <BookmarkIcon className="w-6 h-6 text-gray-400 hover:text-yellow-500" />
                  )}
                </button>
              </div>
              
              <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{scholarship.location}</span>
                </div>
                <span>•</span>
                <span>{scholarship.category}</span>
                {scholarship.renewable && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">Renewable</span>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg">{scholarship.description}</p>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
                  <span className="text-4xl font-bold text-green-600">
                    ${scholarship.amount.toLocaleString()}
                  </span>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getMatchColor(scholarship.eligibilityMatch)}`}>
                  {scholarship.eligibilityMatch}% match
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: AcademicCapIcon },
                { id: 'requirements', name: 'Requirements', icon: CheckCircleIcon },
                { id: 'application', name: 'Application', icon: DocumentTextIcon },
                { id: 'tips', name: 'Tips & Advice', icon: LightBulbIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-medium">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                        {daysUntilDeadline > 0 && (
                          <p className="text-sm text-orange-600">
                            {daysUntilDeadline} days remaining
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Application Type</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getApplicationTypeColor(scholarship.applicationType)}`}>
                          {scholarship.applicationType.charAt(0).toUpperCase() + scholarship.applicationType.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StarIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Minimum GPA</p>
                        <p className="font-medium">{scholarship.gpa}</p>
                      </div>
                    </div>
                    {scholarship.satScore && (
                      <div className="flex items-center space-x-3">
                        <AcademicCapSolidIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">SAT Score</p>
                          <p className="font-medium">{scholarship.satScore}+</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
                  <div className="space-y-3">
                    {scholarship.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Requirements</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Academic Requirements</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span>Minimum GPA: {scholarship.gpa}</span>
                      </li>
                      {scholarship.satScore && (
                        <li className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>SAT Score: {scholarship.satScore}+</span>
                        </li>
                      )}
                      {scholarship.actScore && (
                        <li className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>ACT Score: {scholarship.actScore}+</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Demographic Requirements</h4>
                    <ul className="space-y-2">
                      {scholarship.ethnicity && (
                        <li className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>Ethnicity: {scholarship.ethnicity}</span>
                        </li>
                      )}
                      {scholarship.gender && (
                        <li className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>Gender: {scholarship.gender}</span>
                        </li>
                      )}
                      {scholarship.firstGen && (
                        <li className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <span>First-generation college student</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Financial Requirements</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span>{scholarship.needBased ? 'Need-based' : 'Not need-based'}</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span>{scholarship.meritBased ? 'Merit-based' : 'Not merit-based'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Steps</h3>
                  <div className="space-y-4">
                    {scholarship.applicationSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                  <div className="space-y-3">
                    {scholarship.documents.map((document, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <ClipboardDocumentIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{document}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {scholarship.essayPrompts && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Essay Prompts</h3>
                    <div className="space-y-4">
                      {scholarship.essayPrompts.map((prompt, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{prompt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tips</h3>
                  <div className="space-y-4">
                    {scholarship.tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <LightBulbIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                    Important Reminders
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Start your application early to avoid last-minute stress</li>
                    <li>• Double-check all requirements before submitting</li>
                    <li>• Keep copies of all submitted documents</li>
                    <li>• Follow up on your application status</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href={scholarship.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                  Apply Now
                </a>
                <button className="w-full btn-secondary">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                  Get Mentor Help
                </button>
                <button className="w-full btn-ghost">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Save to List
                </button>
              </div>
            </div>

            {/* Similar Scholarships */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Scholarships</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">Hispanic Scholarship Fund</h4>
                  <p className="text-sm text-green-600 font-medium">$5,000</p>
                  <p className="text-xs text-gray-600">92% match</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm">Gates Millennium Scholars</h4>
                  <p className="text-sm text-green-600 font-medium">$50,000</p>
                  <p className="text-xs text-gray-600">78% match</p>
                </div>
                <Link href="/scholarships" className="text-sm text-blue-600 hover:text-blue-700">
                  View all similar scholarships →
                </Link>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Application Opens</p>
                    <p className="text-xs text-gray-600">September 1, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Deadline</p>
                    <p className="text-xs text-gray-600">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Results</p>
                    <p className="text-xs text-gray-600">May 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


