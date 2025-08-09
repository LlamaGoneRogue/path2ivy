export interface StudentProfile {
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

export interface College {
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

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  gpa: number;
  satScore?: number;
  actScore?: number;
  majors: string[];
  ethnicity?: string;
  firstGen?: boolean;
  state?: string;
  category: 'merit' | 'need' | 'ethnicity' | 'major' | 'state' | 'other';
  matchScore: number;
  description: string;
  requirements: string[];
  applicationSteps: string[];
  tips: string[];
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

export interface Mentor {
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

export interface Activity {
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

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  tasks: Task[];
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  earnedDate: string;
  points: number;
}

export interface RoadmapPhase {
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


