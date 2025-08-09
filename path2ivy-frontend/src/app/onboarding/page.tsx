'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  HeartIcon,
  BanknotesIcon,
  MapPinIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { userAPI } from '@/lib/api';

const steps = [
  {
    id: 'academic',
    title: 'Academic Profile',
    description: 'Tell us about your academic achievements',
    icon: AcademicCapIcon,
  },
  {
    id: 'interests',
    title: 'Interests & Goals',
    description: 'What are you passionate about?',
    icon: HeartIcon,
  },
  {
    id: 'preferences',
    title: 'College Preferences',
    description: 'What kind of college experience do you want?',
    icon: AcademicCapIcon,
  },
  {
    id: 'financial',
    title: 'Financial Considerations',
    description: 'Help us find affordable options',
    icon: BanknotesIcon,
  },
];

const majors = [
  'Computer Science', 'Engineering', 'Business', 'Medicine/Pre-Med', 'Law/Pre-Law',
  'Psychology', 'Biology', 'Chemistry', 'Mathematics', 'English Literature',
  'History', 'Political Science', 'Economics', 'Art & Design', 'Music',
  'Physics', 'Environmental Science', 'Sociology', 'Philosophy', 'Education'
];

const interests = [
  'Technology', 'Science', 'Arts', 'Sports', 'Music', 'Literature',
  'Politics', 'Environment', 'Community Service', 'Entrepreneurship',
  'Research', 'Writing', 'Photography', 'Theater', 'Leadership'
];

const collegeTypes = [
  'Research University', 'Liberal Arts College', 'Technical Institute',
  'Community College', 'Online Programs', 'International Programs'
];

const regions = [
  'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast',
  'Mountain States', 'International', 'No Preference'
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    gpa: '',
    satScore: '',
    actScore: '',
    interests: [] as string[],
    careerGoals: '',
    majors: [] as string[],
    collegeTypes: [] as string[],
    preferredSize: 'medium',
    geographicPreferences: [] as string[],
    maxTuition: '',
    financialAid: false,
    extracurriculars: [] as string[],
  });

  const router = useRouter();
  const { user, updateUser } = useAuth();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleFinish = async () => {
    setIsLoading(true);
    
    try {
      const profileData = {
        profile: {
          gpa: parseFloat(formData.gpa) || 0,
          satScore: formData.satScore ? parseInt(formData.satScore) : undefined,
          actScore: formData.actScore ? parseInt(formData.actScore) : undefined,
          interests: formData.interests,
          careerGoals: formData.careerGoals,
          financialAid: formData.financialAid,
          geographicPreferences: formData.geographicPreferences,
          extracurriculars: formData.extracurriculars,
        },
        preferences: {
          majors: formData.majors,
          collegeTypes: formData.collegeTypes,
          preferredSize: formData.preferredSize,
          maxTuition: formData.maxTuition ? parseInt(formData.maxTuition) : undefined,
        }
      };

      await userAPI.updateProfile(profileData);
      updateUser(profileData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Academic Profile
        return (
          <div className="space-y-6">
            <div>
              <label className="label">Current GPA (4.0 scale)</label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.01"
                className="input"
                placeholder="3.85"
                value={formData.gpa}
                onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">SAT Score (optional)</label>
                <input
                  type="number"
                  min="400"
                  max="1600"
                  className="input"
                  placeholder="1450"
                  value={formData.satScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, satScore: e.target.value }))}
                />
              </div>

              <div>
                <label className="label">ACT Score (optional)</label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  className="input"
                  placeholder="32"
                  value={formData.actScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, actScore: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="label">Main Extracurricular Activities</label>
              <textarea
                className="input"
                rows={3}
                placeholder="e.g., Student Government President, Varsity Soccer, Debate Team..."
                value={formData.extracurriculars.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  extracurriculars: e.target.value.split(', ').filter(Boolean)
                }))}
              />
            </div>
          </div>
        );

      case 1: // Interests & Goals
        return (
          <div className="space-y-6">
            <div>
              <label className="label">What are your main interests? (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleArrayToggle('interests', interest)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Career Goals & Aspirations</label>
              <textarea
                className="input"
                rows={4}
                placeholder="What do you want to do after college? What are your long-term career goals?"
                value={formData.careerGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
              />
            </div>

            <div>
              <label className="label">Potential Majors (Select up to 3)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {majors.map((major) => (
                  <button
                    key={major}
                    type="button"
                    onClick={() => handleArrayToggle('majors', major)}
                    disabled={formData.majors.length >= 3 && !formData.majors.includes(major)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                      formData.majors.includes(major)
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : formData.majors.length >= 3
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                    }`}
                  >
                    {major}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.majors.length}/3
              </p>
            </div>
          </div>
        );

      case 2: // College Preferences
        return (
          <div className="space-y-6">
            <div>
              <label className="label">Preferred College Types</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {collegeTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleArrayToggle('collegeTypes', type)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.collegeTypes.includes(type)
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Preferred College Size</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { value: 'small', label: 'Small (< 5,000)', desc: 'Intimate community' },
                  { value: 'medium', label: 'Medium (5,000-15,000)', desc: 'Balanced experience' },
                  { value: 'large', label: 'Large (> 15,000)', desc: 'Diverse opportunities' }
                ].map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, preferredSize: size.value }))}
                    className={`p-4 rounded-lg border text-sm font-medium transition-all ${
                      formData.preferredSize === size.value
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                    }`}
                  >
                    <div className="font-semibold">{size.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{size.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Geographic Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => handleArrayToggle('geographicPreferences', region)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      formData.geographicPreferences.includes(region)
                        ? 'bg-primary-50 border-primary-200 text-primary-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Financial
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="financialAid"
                checked={formData.financialAid}
                onChange={(e) => setFormData(prev => ({ ...prev, financialAid: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="financialAid" className="text-sm font-medium text-gray-700">
                I will need financial aid or scholarships
              </label>
            </div>

            <div>
              <label className="label">Maximum Annual Tuition Budget (optional)</label>
              <select
                className="input"
                value={formData.maxTuition}
                onChange={(e) => setFormData(prev => ({ ...prev, maxTuition: e.target.value }))}
              >
                <option value="">No specific limit</option>
                <option value="20000">Under $20,000</option>
                <option value="30000">$20,000 - $30,000</option>
                <option value="50000">$30,000 - $50,000</option>
                <option value="70000">$50,000 - $70,000</option>
                <option value="100000">$70,000+</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <BanknotesIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Financial Aid Matching</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    We'll help you find colleges with strong financial aid programs and scholarships 
                    you qualify for based on your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <SparklesIcon className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Let's Personalize Your Journey</h1>
          </div>
          <p className="text-gray-600">
            Help us understand your goals so we can create the perfect college plan for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Headers */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index <= currentStep ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                index < currentStep
                  ? 'bg-primary-600 text-white'
                  : index === currentStep
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <div className="text-xs font-medium text-center">
                <div className="hidden sm:block">{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="card mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Setting up your profile...
                </div>
              ) : (
                <>
                  Complete Setup
                  <SparklesIcon className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



