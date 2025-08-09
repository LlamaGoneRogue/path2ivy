'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  SparklesIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'link';
}

interface QuickQuestion {
  id: string;
  text: string;
  icon: any;
  category: string;
}

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
  communityService: number;
  workExperience: boolean;
  militaryService: boolean;
  disability: boolean;
  ruralArea: boolean;
  urbanArea: boolean;
  highSchoolType: 'public' | 'private' | 'charter' | 'homeschool';
  classRank?: number;
  classSize?: number;
}

// Mock student profile - in real app this would come from context or props
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

const quickQuestions: QuickQuestion[] = [
  {
    id: '1',
    text: 'How do I find scholarships?',
    icon: CurrencyDollarIcon,
    category: 'scholarships'
  },
  {
    id: '2',
    text: 'What makes a strong college application?',
    icon: DocumentTextIcon,
    category: 'applications'
  },
  {
    id: '3',
    text: 'When should I start applying?',
    icon: ClockIcon,
    category: 'timeline'
  },
  {
    id: '4',
    text: 'How do I choose the right college?',
    icon: AcademicCapIcon,
    category: 'college-selection'
  },
  {
    id: '5',
    text: 'What are my chances of getting in?',
    icon: CheckCircleIcon,
    category: 'admissions'
  },
  {
    id: '6',
    text: 'How can mentors help me?',
    icon: UserGroupIcon,
    category: 'mentorship'
  }
];

const aiResponses = {
  'scholarships': {
    'How do I find scholarships?': (profile: StudentProfile) => `Based on your profile, here are the best scholarship opportunities for you:

**Perfect Matches for You:**
• **Hispanic Scholarship Fund** - You're an excellent candidate with your 3.8 GPA and Hispanic heritage
• **First Generation Scholarships** - Your first-gen status opens up many opportunities
• **California State Scholarships** - As a California resident, you qualify for state-specific programs
• **STEM Scholarships** - Your Computer Science/Engineering focus makes you eligible for tech scholarships

**Your Competitive Advantages:**
• Strong GPA (3.8) and test scores (SAT: 1450)
• Leadership experience (Robotics Club President)
• Community service (120 hours/year)
• First-generation college student
• California resident

**Next Steps:**
1. Use our Scholarship Finder to see all matches
2. Focus on Hispanic and first-gen scholarships
3. Apply to 10-15 scholarships to maximize chances
4. Start applications early (many deadlines in fall)

Pro tip: Your combination of academic excellence and first-gen status makes you very competitive! 🎓💰`,
    'default': (profile: StudentProfile) => `I can help you find scholarships that match your profile. With your ${profile.gpa} GPA, ${profile.satScore} SAT score, and ${profile.ethnicity} background, you're eligible for many opportunities. What specific criteria are you looking for?`
  },
  'applications': {
    'What makes a strong college application?': (profile: StudentProfile) => `Based on your profile, here's how to strengthen your application:

**Your Current Strengths:**
✅ Strong academic record (3.8 GPA, 1450 SAT)
✅ Leadership experience (Robotics Club President)
✅ Community service (120 hours/year)
✅ First-generation college student (unique perspective)
✅ Clear academic focus (Computer Science/Engineering)

**Areas to Highlight:**
• **Leadership Story**: Emphasize your Robotics Club presidency and how it shaped your engineering interests
• **First-Gen Perspective**: Share how being first-gen motivates you and what you'll bring to campus
• **Community Impact**: Detail your 120 hours of service and its impact
• **Academic Passion**: Connect your extracurriculars to your intended major

**Essay Topics to Consider:**
• How your first-gen status drives your academic goals
• Your journey from robotics club member to president
• How community service shaped your engineering perspective
• Your vision for using technology to solve real-world problems

**Application Strategy:**
• Apply to 8-12 colleges (mix of reach, match, safety)
• Focus on schools with strong engineering programs
• Emphasize your unique combination of academic excellence and leadership

Your profile is very strong - focus on telling your unique story! 📚✨`,
    'default': (profile: StudentProfile) => `I can help you strengthen your application. With your ${profile.gpa} GPA and leadership experience, you have a solid foundation. What area would you like to focus on?`
  },
  'timeline': {
    'When should I start applying?': (profile: StudentProfile) => `Here's your personalized college application timeline:

**Right Now (Senior Year Fall):**
• Finalize your college list (8-12 schools)
• Complete your personal statement
• Request teacher recommendations
• Submit Early Decision/Early Action applications (Nov 1-15)
• Apply to scholarships (many deadlines now!)

**This Winter (Dec-Feb):**
• Submit Regular Decision applications (Jan 1-15)
• Complete FAFSA and CSS Profile
• Apply to more scholarships
• Prepare for interviews

**This Spring (Mar-May):**
• Compare financial aid offers
• Visit admitted schools
• Make final decision by May 1
• Notify other schools of your choice

**For Your Profile Specifically:**
• Your strong academics make you competitive for Early Decision
• Apply to Hispanic and first-gen scholarships now
• Consider engineering-specific scholarships
• Your leadership experience is perfect for application essays

Pro tip: Start your personal statement this week! ⏰📅`,
    'default': (profile: StudentProfile) => `Timing is crucial for college applications. With your strong profile, you should aim for Early Decision/Early Action. What specific deadlines are you concerned about?`
  },
  'college-selection': {
    'How do I choose the right college?': (profile: StudentProfile) => `Based on your profile, here's how to choose the right college:

**Academic Fit for You:**
• Strong engineering/computer science programs
• Research opportunities in robotics/AI
• Class sizes that match your learning style
• Internship and co-op programs

**Financial Fit:**
• Schools with generous financial aid for first-gen students
• Hispanic scholarship opportunities
• California resident benefits
• Work-study programs

**Social Fit:**
• Diverse student body (important for your background)
• Strong Hispanic/Latino community
• Engineering/STEM culture
• Location preferences (urban vs. suburban)

**Recommended College Types:**
• **Reach Schools**: Stanford, MIT, UC Berkeley (strong engineering + diversity)
• **Match Schools**: UC San Diego, UC Irvine, Cal Poly (great engineering + in-state)
• **Safety Schools**: CSU campuses, private schools with good aid

**Questions to Ask:**
• What support exists for first-gen students?
• How strong is the Hispanic/Latino community?
• What engineering research opportunities are available?
• What's the job placement rate for engineering graduates?

Use our College Matcher to find your perfect fit! 🎯🏫`,
    'default': (profile: StudentProfile) => `Choosing the right college is a big decision. With your engineering focus and first-gen status, you should look for schools with strong support programs. What factors are most important to you?`
  },
  'admissions': {
    'What are my chances of getting in?': (profile: StudentProfile) => `Based on your profile, here's your admission outlook:

**Your Competitive Strengths:**
• Strong academics (3.8 GPA, 1450 SAT) - 85% weight
• Leadership experience (Robotics Club President) - 10% weight
• First-generation status (unique perspective) - 5% weight
• Community service (120 hours) - demonstrates character
• Clear academic focus (Engineering/CS)

**Admission Chances by School Type:**

**Reach Schools (20-30% chance):**
• Stanford, MIT, UC Berkeley
• Your academics are competitive, but these are highly selective

**Target Schools (50-70% chance):**
• UC San Diego, UC Irvine, Cal Poly
• Strong match for your profile

**Safety Schools (80%+ chance):**
• CSU campuses, private schools with good aid
• Very likely to be admitted

**What Makes You Stand Out:**
• First-generation college student (unique perspective)
• Strong leadership in STEM activities
• Clear connection between activities and intended major
• Demonstrated community commitment

**Application Strategy:**
• Apply to 2-3 reach schools
• 4-6 target schools
• 2-3 safety schools
• Focus on schools with strong first-gen support

Your profile is very strong - you have excellent chances! 📊🎯`,
    'default': (profile: StudentProfile) => `I can help assess your chances. With your ${profile.gpa} GPA and leadership experience, you're competitive for many schools. What specific colleges are you interested in?`
  },
  'mentorship': {
    'How can mentors help me?': (profile: StudentProfile) => `Based on your profile, here's how mentors can help you specifically:

**Application Strategy for Your Background:**
• Help you craft essays that highlight your first-gen journey
• Guide you through the college application process (new to your family)
• Review your activities list to maximize impact
• Help you explain your engineering interests and leadership

**College Selection Guidance:**
• Identify schools with strong first-gen support programs
• Find colleges with vibrant Hispanic/Latino communities
• Recommend engineering schools that value your background
• Help you understand financial aid and scholarship opportunities

**Scholarship Guidance:**
• Identify Hispanic and first-gen scholarships you qualify for
• Help you write compelling scholarship essays
• Guide you through the FAFSA and financial aid process
• Connect you with organizations that support first-gen students

**Personal Support:**
• Provide emotional support during this stressful process
• Help you navigate being the first in your family to attend college
• Celebrate your achievements and keep you motivated
• Connect you with other first-gen students

**Recommended Mentor Types:**
• First-generation college graduates
• Engineering professionals
• Hispanic/Latino community leaders
• College admissions counselors

Our mentors are verified experts who understand your unique journey! 🤝💡`,
    'default': (profile: StudentProfile) => `Mentors provide invaluable guidance throughout your college journey. As a first-gen student, having a mentor can make a huge difference. What specific help do you need?`
  }
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Path2Ivy AI assistant. I can help you with college admissions, scholarships, applications, and more. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    setIsTyping(false);
    return response;
  };

  const generateAIResponse = async (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for quick question matches
    for (const question of quickQuestions) {
      if (lowerMessage.includes(question.text.toLowerCase()) || 
          lowerMessage.includes(question.category)) {
        const response = aiResponses[question.category as keyof typeof aiResponses]?.[question.text] || 
                        aiResponses[question.category as keyof typeof aiResponses]?.default ||
                        "I can help you with that! Let me provide some guidance.";
        return await simulateTyping(response(mockStudentProfile));
      }
    }

    // Check for general keywords
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid') || lowerMessage.includes('money')) {
      return await simulateTyping(aiResponses.scholarships.default(mockStudentProfile));
    }
    
    if (lowerMessage.includes('application') || lowerMessage.includes('essay') || lowerMessage.includes('apply')) {
      return await simulateTyping(aiResponses.applications.default(mockStudentProfile));
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('when') || lowerMessage.includes('deadline')) {
      return await simulateTyping(aiResponses.timeline.default(mockStudentProfile));
    }
    
    if (lowerMessage.includes('college') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
      return await simulateTyping(aiResponses['college-selection'].default(mockStudentProfile));
    }
    
    if (lowerMessage.includes('chance') || lowerMessage.includes('admission') || lowerMessage.includes('get in')) {
      return await simulateTyping(aiResponses.admissions.default(mockStudentProfile));
    }
    
    if (lowerMessage.includes('mentor') || lowerMessage.includes('help') || lowerMessage.includes('guidance')) {
      return await simulateTyping(aiResponses.mentorship.default(mockStudentProfile));
    }

    // Check for profile-specific questions
    if (lowerMessage.includes('gpa') || lowerMessage.includes('grade')) {
      return await simulateTyping(`Your GPA of ${mockStudentProfile.gpa} is excellent! This puts you in a strong position for many colleges and scholarships. For top-tier schools, you're competitive, and for most other schools, you're well above average.`);
    }

    if (lowerMessage.includes('sat') || lowerMessage.includes('test score')) {
      return await simulateTyping(`Your SAT score of ${mockStudentProfile.satScore} is very strong! This is in the top 10% nationally and makes you competitive for most colleges. Combined with your ${mockStudentProfile.gpa} GPA, you have a very solid academic profile.`);
    }

    if (lowerMessage.includes('first gen') || lowerMessage.includes('first generation')) {
      return await simulateTyping(`Being a first-generation college student is actually a huge advantage in your applications! Many colleges actively seek first-gen students because they bring unique perspectives and resilience. Your first-gen status opens up special scholarships and support programs.`);
    }

    if (lowerMessage.includes('hispanic') || lowerMessage.includes('latino')) {
      return await simulateTyping(`Your Hispanic heritage opens up many scholarship opportunities! Organizations like the Hispanic Scholarship Fund, Gates Millennium Scholars, and many others specifically support Hispanic students. Your strong academic profile makes you very competitive for these awards.`);
    }

    // Default response
    return await simulateTyping("I'm here to help with your college admissions journey! You can ask me about scholarships, applications, college selection, timelines, or connect with mentors. What would you like to know more about?");
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponse = await generateAIResponse(text);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleQuickQuestion = async (question: QuickQuestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const response = aiResponses[question.category as keyof typeof aiResponses]?.[question.text] || 
                    aiResponses[question.category as keyof typeof aiResponses]?.default ||
                    "I can help you with that! Let me provide some guidance.";
    
    const aiResponse = await simulateTyping(response(mockStudentProfile));
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Path2Ivy AI</h3>
                  <p className="text-xs text-blue-100">Your college admissions assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.slice(0, 4).map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-gray-50 hover:bg-gray-100 rounded-lg p-2 text-left transition-colors"
                    >
                      <question.icon className="w-3 h-3 inline mr-1 text-blue-600" />
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about college admissions..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
