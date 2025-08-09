import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Fair-use limiter for frequent AI calls
const roadmapLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 60 });

// Unlimited AI daily roadmaps (fair-use enforced via limiter)
router.post('/daily-roadmap', roadmapLimiter, async (req, res) => {
  try {
    const { profile = {}, focusAreas = [], date } = req.body || {};
    const now = date ? new Date(date) : new Date();
    const tasks = [
      { id: 't-essay', title: 'Draft essay paragraph', description: 'Write 150–200 words refining your core story.', category: 'essays', priority: 'high', estimatedTime: 45 },
      { id: 't-college', title: 'Research 2 target colleges', description: 'Capture 3 program highlights per college.', category: 'applications', priority: 'medium', estimatedTime: 35 },
      { id: 't-scholar', title: 'Identify 1 scholarship', description: 'Record amount, deadline, and fit reason.', category: 'financial', priority: 'medium', estimatedTime: 20 },
    ];
    const needsTests = profile?.satScore == null && profile?.actScore == null;
    if (needsTests) tasks.splice(1, 0, { id: 't-test', title: 'SAT/ACT practice set', description: 'Complete a focused practice set with review.', category: 'test-prep', priority: 'medium', estimatedTime: 40 });
    if (Array.isArray(focusAreas) && focusAreas.length) tasks.sort((a, b) => (focusAreas.includes(a.category) ? -1 : 0) - (focusAreas.includes(b.category) ? -1 : 0));
    res.json({ date: now.toISOString(), tasks });
  } catch (e) {
    res.status(500).json({ message: 'Error generating daily roadmap' });
  }
});

// Generate AI Roadmap (demo-friendly)
router.post('/roadmap', async (req, res) => {
  try {
    const {
      profile = {},
      majorPreferences = [],
      targetRegions = [],
      collegeType = 'any',
      sizePreference = 'any',
      budgetMaxTuition,
      extracurriculars = [],
      constraints = {},
      goals = {}
    } = req.body || {};

    // Try to fetch college matches from our own API (works in demo or with DB)
    let topMatches: any[] = [];
    try {
      const port = process.env.PORT || 3002;
      const response = await fetch(`http://127.0.0.1:${port}/api/colleges/match`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          gpa: profile?.gpa,
          sat: profile?.sat,
          act: profile?.act,
          interests: majorPreferences,
          preferences: {
            type: collegeType === 'any' ? undefined : collegeType,
            region: targetRegions?.[0],
            size: sizePreference === 'any' ? undefined : sizePreference,
            maxTuition: budgetMaxTuition
          }
        })
      });
      const json = await response.json();
      topMatches = Array.isArray(json?.recommendations) ? json.recommendations.slice(0, 5) : [];
    } catch (_e) {
      topMatches = [];
    }

    // Compose term-by-term sections based on provided profile and goals
    const currentGrade = String(profile?.currentGrade || '11');
    const apIBCourses: string[] = Array.isArray(profile?.apIBCourses) ? profile.apIBCourses : [];

    const sections = [
      {
        term: `Fall ${currentGrade}`,
        courses: [...apIBCourses, 'English (Honors)', 'Science elective'],
        testing: ['PSAT prep (weekly 2h)', 'SAT practice tests (monthly)'],
        extracurriculars: [...extracurriculars, 'Major-aligned club initiative'],
        milestones: ['Meet counselor to align courses to majors', 'Shortlist 10–15 colleges']
      },
      {
        term: `Spring ${currentGrade}`,
        courses: ['AP/IB exams planning', 'Capstone/Research project'],
        testing: ['Official SAT/ACT window', 'Subject-specific practice (weekly)'],
        extracurriculars: ['Pursue leadership role', 'Community impact project'],
        milestones: ['Begin essay brainstorming', 'Request recommendation relationships']
      },
      {
        term: 'Summer Before 12th',
        courses: ['College essay drafts workshop'],
        testing: ['SAT/ACT retake plan if needed'],
        extracurriculars: ['Internship/Research/Job (6–8 weeks)'],
        milestones: ['Finalize college list (with reach/target/safe)', 'Draft main essay + supplements']
      },
      {
        term: 'Fall 12th',
        courses: ['Balanced senior schedule'],
        testing: ['Finalize standardized testing (if applicable)'],
        extracurriculars: ['Sustain leadership and community work'],
        milestones: ['Complete applications (EA/ED/RA)', 'Apply to scholarships (monthly)']
      }
    ];

    const summary = `Roadmap aligned to ${majorPreferences.join(', ') || 'your interests'} with ${topMatches.length} highlighted college matches to guide course rigor, testing cadence, and activity depth.`;

    res.json({ summary, sections });
  } catch (error) {
    res.status(500).json({ message: 'Error generating roadmap' });
  }
});

// Get AI-powered essay feedback
router.post('/essay-feedback', async (req, res) => {
  try {
    const { essay, prompt, wordCount } = req.body;
    
    // Mock AI feedback response
    const feedback = {
      score: 8.5,
      strengths: [
        'Strong personal voice and authentic storytelling',
        'Clear structure with logical flow',
        'Specific examples that support your points'
      ],
      areasForImprovement: [
        'Consider adding more specific details about your experiences',
        'The conclusion could be more impactful',
        'Some sentences could be more concise'
      ],
      suggestions: [
        'Add a specific anecdote about your leadership experience',
        'Include more reflection on how this experience shaped you',
        'Strengthen the connection to your future goals'
      ],
      wordCount: wordCount || 650,
      estimatedReadingTime: Math.ceil((wordCount || 650) / 200)
    };
    
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error generating essay feedback' });
  }
});

// Get AI college recommendations
router.post('/college-recommendations', async (req, res) => {
  try {
    const { profile, preferences } = req.body;
    
    // Mock AI recommendations
    const recommendations = {
      reach: [
        {
          name: 'Stanford University',
          matchScore: 0.92,
          reasoning: 'Strong STEM programs align with your intended major',
          applicationTips: ['Focus on innovation and leadership', 'Highlight research experience']
        },
        {
          name: 'MIT',
          matchScore: 0.89,
          reasoning: 'Excellent for Computer Science and Engineering',
          applicationTips: ['Emphasize problem-solving skills', 'Showcase technical projects']
        }
      ],
      target: [
        {
          name: 'UC Berkeley',
          matchScore: 0.85,
          reasoning: 'Strong public university with excellent CS program',
          applicationTips: ['Focus on personal insight questions', 'Demonstrate leadership']
        },
        {
          name: 'University of Michigan',
          matchScore: 0.82,
          reasoning: 'Great engineering program with good financial aid',
          applicationTips: ['Highlight academic achievements', 'Show community involvement']
        }
      ],
      safety: [
        {
          name: 'UC San Diego',
          matchScore: 0.78,
          reasoning: 'Strong STEM focus with higher acceptance rate',
          applicationTips: ['Emphasize research interest', 'Show passion for learning']
        }
      ]
    };
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error generating college recommendations' });
  }
});

// Get AI application strategy
router.post('/application-strategy', async (req, res) => {
  try {
    const { profile, targetColleges } = req.body;
    
    // Mock AI strategy
    const strategy = {
      timeline: [
        {
          month: 'September',
          tasks: [
            'Finalize college list',
            'Request letters of recommendation',
            'Begin drafting personal statement'
          ]
        },
        {
          month: 'October',
          tasks: [
            'Complete UC applications',
            'Write supplemental essays',
            'Prepare for interviews'
          ]
        },
        {
          month: 'November',
          tasks: [
            'Submit early decision applications',
            'Complete remaining applications',
            'Review all materials'
          ]
        }
      ],
      priorities: [
        'Focus on UC Berkeley as top choice',
        'Strengthen extracurricular narrative',
        'Prepare for potential interviews'
      ],
      riskFactors: [
        'GPA slightly below average for reach schools',
        'Limited research experience',
        'Need to strengthen leadership narrative'
      ]
    };
    
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ message: 'Error generating application strategy' });
  }
});

// Get AI interview preparation
router.post('/interview-prep', async (req, res) => {
  try {
    const { college, profile } = req.body;
    
    // Mock interview prep
    const interviewPrep = {
      commonQuestions: [
        'Tell me about yourself',
        'Why are you interested in this college?',
        'What are your academic and career goals?',
        'Describe a challenge you\'ve overcome',
        'What extracurricular activities are most meaningful to you?'
      ],
      collegeSpecificQuestions: [
        'How do you plan to contribute to our campus community?',
        'What research opportunities interest you?',
        'How do you handle academic pressure?'
      ],
      tips: [
        'Practice your responses but don\'t memorize them',
        'Prepare specific examples from your experiences',
        'Research the college thoroughly',
        'Prepare thoughtful questions to ask',
        'Dress appropriately and arrive early'
      ],
      mockInterview: {
        duration: 30,
        format: 'One-on-one with alumni',
        location: 'Virtual or on-campus'
      }
    };
    
    res.json(interviewPrep);
  } catch (error) {
    res.status(500).json({ message: 'Error generating interview preparation' });
  }
});

export default router;

