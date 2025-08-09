import College from '../models/College';

export const seedColleges = async () => {
  try {
    // Check if colleges already exist
    const existingColleges = await College.countDocuments();
    if (existingColleges > 0) {
      console.log('✅ Colleges already seeded');
      return;
    }

    const colleges = [
      {
        name: 'Stanford University',
        location: {
          city: 'Stanford',
          state: 'California',
          region: 'West Coast'
        },
        type: 'private',
        size: 'medium',
        admissionData: {
          acceptanceRate: 4.3,
          averageGPA: 3.96,
          averageSAT: 1520,
          averageACT: 34,
          applicationDeadlines: {
            regular: new Date('2024-01-05'),
            early: new Date('2023-11-01')
          }
        },
        academics: {
          majors: ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Law'],
          ranking: 6,
          studentFacultyRatio: 5
        },
        financials: {
          tuition: 56169,
          roomAndBoard: 17255,
          totalCost: 78218,
          averageAid: 53287,
          financialAidRate: 58
        },
        campusLife: {
          setting: 'suburban',
          diversity: 85,
          greekLife: true,
          athletics: 'Division I'
        },
        requirements: {
          essays: ['Why Stanford?', 'What matters to you and why?'],
          recommendations: 2,
          interviews: false,
          portfolios: false
        }
      },
      {
        name: 'Massachusetts Institute of Technology',
        location: {
          city: 'Cambridge',
          state: 'Massachusetts',
          region: 'Northeast'
        },
        type: 'private',
        size: 'small',
        admissionData: {
          acceptanceRate: 6.7,
          averageGPA: 4.0,
          averageSAT: 1535,
          averageACT: 35,
          applicationDeadlines: {
            regular: new Date('2024-01-01'),
            early: new Date('2023-11-01'),
            earlyAction: new Date('2023-11-01')
          }
        },
        academics: {
          majors: ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Economics'],
          ranking: 2,
          studentFacultyRatio: 3
        },
        financials: {
          tuition: 57986,
          roomAndBoard: 18730,
          totalCost: 79850,
          averageAid: 55874,
          financialAidRate: 62
        },
        campusLife: {
          setting: 'urban',
          diversity: 90,
          greekLife: true,
          athletics: 'Division III'
        },
        requirements: {
          essays: ['Why MIT?', 'Personal challenge'],
          recommendations: 2,
          interviews: true,
          portfolios: false
        }
      },
      {
        name: 'University of California, Berkeley',
        location: {
          city: 'Berkeley',
          state: 'California',
          region: 'West Coast'
        },
        type: 'public',
        size: 'large',
        admissionData: {
          acceptanceRate: 17.5,
          averageGPA: 3.89,
          averageSAT: 1450,
          averageACT: 32,
          applicationDeadlines: {
            regular: new Date('2023-11-30'),
            early: new Date('2023-11-30')
          }
        },
        academics: {
          majors: ['Engineering', 'Computer Science', 'Business', 'Biology', 'Psychology'],
          ranking: 22,
          studentFacultyRatio: 20
        },
        financials: {
          tuition: 14254,
          roomAndBoard: 18714,
          totalCost: 36264,
          averageAid: 18000,
          financialAidRate: 68
        },
        campusLife: {
          setting: 'urban',
          diversity: 95,
          greekLife: true,
          athletics: 'Division I'
        },
        requirements: {
          essays: ['Personal insight questions'],
          recommendations: 0,
          interviews: false,
          portfolios: false
        }
      },
      {
        name: 'Cal Poly San Luis Obispo',
        location: {
          city: 'San Luis Obispo',
          state: 'California',
          region: 'West Coast'
        },
        type: 'public',
        size: 'medium',
        admissionData: {
          acceptanceRate: 30.2,
          averageGPA: 3.85,
          averageSAT: 1380,
          averageACT: 30,
          applicationDeadlines: {
            regular: new Date('2023-11-30'),
            early: new Date('2023-10-15')
          }
        },
        academics: {
          majors: ['Engineering', 'Agriculture', 'Architecture', 'Business', 'Computer Science'],
          ranking: 1,
          studentFacultyRatio: 18
        },
        financials: {
          tuition: 10560,
          roomAndBoard: 14778,
          totalCost: 28944,
          averageAid: 12000,
          financialAidRate: 55
        },
        campusLife: {
          setting: 'suburban',
          diversity: 70,
          greekLife: true,
          athletics: 'Division I'
        },
        requirements: {
          essays: ['Personal statement'],
          recommendations: 0,
          interviews: false,
          portfolios: true
        },
        isSponsored: true,
        sponsorshipTier: 'gold'
      },
      {
        name: 'Harvard University',
        location: {
          city: 'Cambridge',
          state: 'Massachusetts',
          region: 'Northeast'
        },
        type: 'private',
        size: 'medium',
        admissionData: {
          acceptanceRate: 3.4,
          averageGPA: 4.0,
          averageSAT: 1560,
          averageACT: 35,
          applicationDeadlines: {
            regular: new Date('2024-01-01'),
            early: new Date('2023-11-01')
          }
        },
        academics: {
          majors: ['Liberal Arts', 'Business', 'Medicine', 'Law', 'Government'],
          ranking: 2,
          studentFacultyRatio: 6
        },
        financials: {
          tuition: 57246,
          roomAndBoard: 19502,
          totalCost: 82866,
          averageAid: 60000,
          financialAidRate: 55
        },
        campusLife: {
          setting: 'urban',
          diversity: 85,
          greekLife: false,
          athletics: 'Division I'
        },
        requirements: {
          essays: ['Personal essay', 'Supplemental essays'],
          recommendations: 2,
          interviews: true,
          portfolios: false
        }
      }
    ];

    await College.insertMany(colleges);
    console.log('✅ Sample colleges seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding colleges:', error);
  }
};



