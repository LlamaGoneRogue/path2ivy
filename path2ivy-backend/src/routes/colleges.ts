import express from 'express';
import College from '../models/College';

const router = express.Router();

// Demo college dataset to ensure robust matching results without DB
type DemoCollege = {
  _id: string;
  name: string;
  location: { city: string; state: string; region: string };
  type: 'public' | 'private';
  size: 'small' | 'medium' | 'large';
  admissionData: { acceptanceRate: number; averageGPA: number; averageSAT?: number; averageACT?: number };
  academics: { majors: string[]; ranking: number };
  financials?: { tuition: number };
};

const demoColleges: DemoCollege[] = [
  { _id: 'c1', name: 'Stanford University', location: { city: 'Stanford', state: 'CA', region: 'West Coast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 4.3, averageGPA: 3.96, averageSAT: 1520, averageACT: 34 }, academics: { majors: ['Computer Science', 'Engineering', 'Business'], ranking: 6 }, financials: { tuition: 56169 } },
  { _id: 'c2', name: 'Massachusetts Institute of Technology', location: { city: 'Cambridge', state: 'MA', region: 'Northeast' }, type: 'private', size: 'small', admissionData: { acceptanceRate: 6.7, averageGPA: 4.0, averageSAT: 1535, averageACT: 35 }, academics: { majors: ['Computer Science', 'Engineering', 'Mathematics'], ranking: 2 }, financials: { tuition: 57986 } },
  { _id: 'c3', name: 'Harvard University', location: { city: 'Cambridge', state: 'MA', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 3.4, averageGPA: 4.0, averageSAT: 1560, averageACT: 35 }, academics: { majors: ['Liberal Arts', 'Government', 'Business'], ranking: 2 }, financials: { tuition: 57246 } },
  { _id: 'c4', name: 'Princeton University', location: { city: 'Princeton', state: 'NJ', region: 'Northeast' }, type: 'private', size: 'small', admissionData: { acceptanceRate: 4.0, averageGPA: 3.98, averageSAT: 1510, averageACT: 34 }, academics: { majors: ['Mathematics', 'Physics', 'Economics'], ranking: 1 }, financials: { tuition: 57410 } },
  { _id: 'c5', name: 'Yale University', location: { city: 'New Haven', state: 'CT', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 4.6, averageGPA: 3.97, averageSAT: 1520, averageACT: 34 }, academics: { majors: ['Liberal Arts', 'History', 'Political Science'], ranking: 5 }, financials: { tuition: 59750 } },
  { _id: 'c6', name: 'Columbia University', location: { city: 'New York', state: 'NY', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 3.9, averageGPA: 3.96, averageSAT: 1510, averageACT: 34 }, academics: { majors: ['Engineering', 'Economics', 'Journalism'], ranking: 18 }, financials: { tuition: 65324 } },
  { _id: 'c7', name: 'University of Chicago', location: { city: 'Chicago', state: 'IL', region: 'Midwest' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 6.0, averageGPA: 3.97, averageSAT: 1530, averageACT: 35 }, academics: { majors: ['Economics', 'Mathematics', 'Biology'], ranking: 12 }, financials: { tuition: 62184 } },
  { _id: 'c8', name: 'University of Pennsylvania', location: { city: 'Philadelphia', state: 'PA', region: 'Northeast' }, type: 'private', size: 'large', admissionData: { acceptanceRate: 5.8, averageGPA: 3.96, averageSAT: 1510, averageACT: 34 }, academics: { majors: ['Business', 'Nursing', 'Engineering'], ranking: 7 }, financials: { tuition: 63000 } },
  { _id: 'c9', name: 'Dartmouth College', location: { city: 'Hanover', state: 'NH', region: 'Northeast' }, type: 'private', size: 'small', admissionData: { acceptanceRate: 6.4, averageGPA: 3.95, averageSAT: 1500, averageACT: 34 }, academics: { majors: ['Liberal Arts', 'Economics', 'Biology'], ranking: 18 }, financials: { tuition: 60000 } },
  { _id: 'c10', name: 'Brown University', location: { city: 'Providence', state: 'RI', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 5.1, averageGPA: 3.94, averageSAT: 1505, averageACT: 34 }, academics: { majors: ['Liberal Arts', 'Computer Science', 'Public Health'], ranking: 9 }, financials: { tuition: 62000 } },
  { _id: 'c11', name: 'University of California, Berkeley', location: { city: 'Berkeley', state: 'CA', region: 'West Coast' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 17.5, averageGPA: 3.89, averageSAT: 1450, averageACT: 32 }, academics: { majors: ['Engineering', 'Computer Science', 'Business'], ranking: 22 }, financials: { tuition: 14254 } },
  { _id: 'c12', name: 'University of California, Los Angeles', location: { city: 'Los Angeles', state: 'CA', region: 'West Coast' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 11.0, averageGPA: 3.9, averageSAT: 1430, averageACT: 31 }, academics: { majors: ['Film', 'Biology', 'Engineering'], ranking: 15 }, financials: { tuition: 13804 } },
  { _id: 'c13', name: 'University of Michigan', location: { city: 'Ann Arbor', state: 'MI', region: 'Midwest' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 20.0, averageGPA: 3.88, averageSAT: 1435, averageACT: 32 }, academics: { majors: ['Engineering', 'Business', 'Public Policy'], ranking: 21 }, financials: { tuition: 17386 } },
  { _id: 'c14', name: 'Carnegie Mellon University', location: { city: 'Pittsburgh', state: 'PA', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 14.0, averageGPA: 3.9, averageSAT: 1510, averageACT: 34 }, academics: { majors: ['Computer Science', 'Engineering', 'Arts'], ranking: 22 }, financials: { tuition: 61222 } },
  { _id: 'c15', name: 'New York University', location: { city: 'New York', state: 'NY', region: 'Northeast' }, type: 'private', size: 'large', admissionData: { acceptanceRate: 12.2, averageGPA: 3.8, averageSAT: 1450, averageACT: 32 }, academics: { majors: ['Business', 'Film', 'Computer Science'], ranking: 35 }, financials: { tuition: 56800 } },
  { _id: 'c16', name: 'Northeastern University', location: { city: 'Boston', state: 'MA', region: 'Northeast' }, type: 'private', size: 'large', admissionData: { acceptanceRate: 18.0, averageGPA: 3.85, averageSAT: 1460, averageACT: 33 }, academics: { majors: ['Computer Science', 'Business', 'Bioengineering'], ranking: 44 }, financials: { tuition: 60000 } },
  { _id: 'c17', name: 'Boston University', location: { city: 'Boston', state: 'MA', region: 'Northeast' }, type: 'private', size: 'large', admissionData: { acceptanceRate: 19.0, averageGPA: 3.8, averageSAT: 1440, averageACT: 32 }, academics: { majors: ['Business', 'Biology', 'Engineering'], ranking: 41 }, financials: { tuition: 62360 } },
  { _id: 'c18', name: 'University of Washington', location: { city: 'Seattle', state: 'WA', region: 'West Coast' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 49.0, averageGPA: 3.78, averageSAT: 1360, averageACT: 30 }, academics: { majors: ['Computer Science', 'Biology', 'Engineering'], ranking: 40 }, financials: { tuition: 12242 } },
  { _id: 'c19', name: 'University of Illinois Urbana-Champaign', location: { city: 'Champaign', state: 'IL', region: 'Midwest' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 45.0, averageGPA: 3.78, averageSAT: 1400, averageACT: 31 }, academics: { majors: ['Computer Science', 'Engineering', 'Business'], ranking: 47 }, financials: { tuition: 17138 } },
  { _id: 'c20', name: 'Purdue University', location: { city: 'West Lafayette', state: 'IN', region: 'Midwest' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 53.0, averageGPA: 3.72, averageSAT: 1360, averageACT: 30 }, academics: { majors: ['Engineering', 'Computer Science', 'Agriculture'], ranking: 49 }, financials: { tuition: 9992 } },
  { _id: 'c21', name: 'Georgia Institute of Technology', location: { city: 'Atlanta', state: 'GA', region: 'South' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 17.0, averageGPA: 3.9, averageSAT: 1465, averageACT: 33 }, academics: { majors: ['Engineering', 'Computer Science', 'Business'], ranking: 33 }, financials: { tuition: 12416 } },
  { _id: 'c22', name: 'University of Texas at Austin', location: { city: 'Austin', state: 'TX', region: 'South' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 31.0, averageGPA: 3.84, averageSAT: 1370, averageACT: 30 }, academics: { majors: ['Computer Science', 'Business', 'Engineering'], ranking: 38 }, financials: { tuition: 11252 } },
  { _id: 'c23', name: 'Duke University', location: { city: 'Durham', state: 'NC', region: 'South' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 6.0, averageGPA: 3.96, averageSAT: 1520, averageACT: 34 }, academics: { majors: ['Biology', 'Economics', 'Computer Science'], ranking: 7 }, financials: { tuition: 63200 } },
  { _id: 'c24', name: 'Johns Hopkins University', location: { city: 'Baltimore', state: 'MD', region: 'Northeast' }, type: 'private', size: 'medium', admissionData: { acceptanceRate: 7.0, averageGPA: 3.95, averageSAT: 1510, averageACT: 34 }, academics: { majors: ['Biology', 'Public Health', 'Engineering'], ranking: 9 }, financials: { tuition: 62000 } },
  { _id: 'c25', name: 'University of California, San Diego', location: { city: 'San Diego', state: 'CA', region: 'West Coast' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 34.0, averageGPA: 3.85, averageSAT: 1410, averageACT: 32 }, academics: { majors: ['Biology', 'Computer Science', 'Engineering'], ranking: 34 }, financials: { tuition: 14000 } },
  { _id: 'c26', name: 'Cal Poly San Luis Obispo', location: { city: 'San Luis Obispo', state: 'CA', region: 'West Coast' }, type: 'public', size: 'medium', admissionData: { acceptanceRate: 30.2, averageGPA: 3.85, averageSAT: 1380, averageACT: 30 }, academics: { majors: ['Engineering', 'Architecture', 'Business'], ranking: 1 }, financials: { tuition: 10560 } },
  { _id: 'c27', name: 'University of Florida', location: { city: 'Gainesville', state: 'FL', region: 'South' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 30.0, averageGPA: 3.85, averageSAT: 1370, averageACT: 30 }, academics: { majors: ['Biology', 'Business', 'Engineering'], ranking: 29 }, financials: { tuition: 6380 } },
  { _id: 'c28', name: 'University of North Carolina at Chapel Hill', location: { city: 'Chapel Hill', state: 'NC', region: 'South' }, type: 'public', size: 'large', admissionData: { acceptanceRate: 20.0, averageGPA: 3.86, averageSAT: 1405, averageACT: 32 }, academics: { majors: ['Business', 'Biology', 'Public Health'], ranking: 22 }, financials: { tuition: 8998 } }
];

// Get all colleges with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      type, 
      state, 
      region, 
      size,
      minAcceptanceRate,
      maxAcceptanceRate,
      maxTuition,
      majors,
      search
    } = req.query;

    const filter: any = {};
    
    if (type) filter.type = type;
    if (state) filter['location.state'] = state;
    if (region) filter['location.region'] = region;
    if (size) filter.size = size;
    if (minAcceptanceRate || maxAcceptanceRate) {
      filter['admissionData.acceptanceRate'] = {};
      if (minAcceptanceRate) filter['admissionData.acceptanceRate'].$gte = Number(minAcceptanceRate);
      if (maxAcceptanceRate) filter['admissionData.acceptanceRate'].$lte = Number(maxAcceptanceRate);
    }
    if (maxTuition) filter['financials.tuition'] = { $lte: Number(maxTuition) };
    if (majors) filter['academics.majors'] = { $in: (majors as string).split(',') };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } }
      ];
    }

    const colleges = await College.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ 'isSponsored': -1, 'academics.ranking': 1 });

    const total = await College.countDocuments(filter);

    res.json({
      colleges,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('Colleges fetch error:', error);
    res.status(500).json({ message: 'Error fetching colleges' });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    console.error('College fetch error:', error);
    res.status(500).json({ message: 'Error fetching college' });
  }
});

// Get college statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await College.aggregate([
      {
        $group: {
          _id: null,
          totalColleges: { $sum: 1 },
          avgAcceptanceRate: { $avg: '$admissionData.acceptanceRate' },
          avgTuition: { $avg: '$financials.tuition' },
          typeDistribution: {
            $push: '$type'
          }
        }
      }
    ]);

    const typeCount = await College.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: stats[0] || {},
      typeDistribution: typeCount
    });
  } catch (error) {
    console.error('College stats error:', error);
    res.status(500).json({ message: 'Error fetching college statistics' });
  }
});

export default router;
 
// Smart College Matching (Demo-friendly)
router.post('/match', async (req, res) => {
  try {
    const {
      gpa,
      sat,
      act,
      interests = [], // array of intended majors/fields
      preferences = {} // { type, region, size, maxTuition }
    } = req.body || {};

    const toNumber = (v: any, d: number) => (typeof v === 'number' && !isNaN(v) ? v : d);
    const studentGpa = Math.max(0, Math.min(4.0, toNumber(gpa, 0)));
    const studentSat = Math.max(0, Math.min(1600, toNumber(sat, 0)));
    const studentAct = Math.max(0, Math.min(36, toNumber(act, 0)));
    const preferredType = preferences.type as 'public' | 'private' | undefined;
    const preferredRegion = preferences.region as string | undefined;
    const preferredSize = preferences.size as 'small' | 'medium' | 'large' | undefined;
    const maxTuition = toNumber(preferences.maxTuition, Number.POSITIVE_INFINITY);

    const normalize = (value: number, max: number) => (max > 0 ? value / max : 0);
    const studentTestNorm = Math.max(normalize(studentSat, 1600), normalize(studentAct, 36));
    const studentStrength = (studentGpa > 0 ? 0.5 * normalize(studentGpa, 4.0) : 0) + (studentTestNorm > 0 ? 0.5 * studentTestNorm : 0);

    // Try DB, fallback to demo
    let pool: any[] = [];
    try {
      const dbColleges = await College.find({}).limit(500);
      if (!dbColleges || dbColleges.length === 0) throw new Error('no-colleges');
      pool = dbColleges;
    } catch (_e) {
      pool = demoColleges;
    }

    type Categorized = {
      id: string;
      name: string;
      acceptanceRate?: number;
      averageGPA?: number;
      averageSAT?: number;
      averageACT?: number;
      region?: string;
      type?: string;
      size?: string;
      majors?: string[];
      tuition?: number;
      category: 'safe' | 'target' | 'reach' | 'extremeReach';
      matchScore: number;
    };

    const scored: Categorized[] = pool.map((c: any) => {
      const acceptanceRate = Number(c?.admissionData?.acceptanceRate ?? c?.admissionData?.acceptance_rate ?? NaN);
      const avgGpa = Number(c?.admissionData?.averageGPA ?? NaN);
      const avgSat = Number(c?.admissionData?.averageSAT ?? NaN);
      const avgAct = Number(c?.admissionData?.averageACT ?? NaN);
      const collegeTestNorm = Math.max(normalize(avgSat || 0, 1600), normalize(avgAct || 0, 36));
      const collegeStrength = (isNaN(avgGpa) ? 0 : 0.5 * normalize(avgGpa, 4.0)) + (collegeTestNorm > 0 ? 0.5 * collegeTestNorm : 0);
      const delta = studentStrength - collegeStrength; // positive => student stronger than typical admit

      // Preference fit
      let fitBonus = 0;
      const collegeType = c?.type;
      const collegeRegion = c?.location?.region || c?.location?.state;
      const collegeSize = c?.size;
      const tuition = Number(c?.financials?.tuition ?? NaN);
      const majors: string[] = c?.academics?.majors || [];

      if (preferredType && collegeType === preferredType) fitBonus += 0.05;
      if (preferredRegion && collegeRegion && (collegeRegion === preferredRegion)) fitBonus += 0.05;
      if (preferredSize && collegeSize === preferredSize) fitBonus += 0.03;
      if (Array.isArray(interests) && interests.length > 0) {
        const intersects = interests.some((i: string) => majors?.some((m: string) => (m || '').toLowerCase().includes((i || '').toLowerCase())));
        if (intersects) fitBonus += 0.07;
      }
      if (!isNaN(tuition) && tuition <= maxTuition) fitBonus += 0.05;

      // Difficulty adjustment using acceptance rate
      const acceptance = isNaN(acceptanceRate) ? 10 : acceptanceRate; // assume moderate if missing
      const selectivityPenalty = acceptance <= 7 ? 0.06 : acceptance <= 10 ? 0.04 : acceptance <= 15 ? 0.02 : 0;

      // Category thresholds
      let category: Categorized['category'];
      if (delta >= 0.12 || (delta >= 0.08 && acceptance >= 25)) category = 'safe';
      else if (delta >= 0.03 && delta < 0.12) category = 'target';
      else if (delta >= -0.05 && delta < 0.03) category = 'reach';
      else category = 'extremeReach';
      if (acceptance <= 7 && delta < 0.03) category = 'extremeReach';

      const matchScore = Math.max(0, Math.min(1, 0.5 + delta - selectivityPenalty + fitBonus));

      return {
        id: String(c._id || c.id),
        name: c.name,
        acceptanceRate: isNaN(acceptanceRate) ? undefined : acceptanceRate,
        averageGPA: isNaN(avgGpa) ? undefined : avgGpa,
        averageSAT: isNaN(avgSat) ? undefined : avgSat,
        averageACT: isNaN(avgAct) ? undefined : avgAct,
        region: collegeRegion,
        type: collegeType,
        size: collegeSize,
        majors,
        tuition: isNaN(tuition) ? undefined : tuition,
        category,
        matchScore
      };
    });

    const safe = scored
      .filter(s => s.category === 'safe')
      .sort((a, b) => b.matchScore - a.matchScore);
    const target = scored
      .filter(s => s.category === 'target')
      .sort((a, b) => b.matchScore - a.matchScore);
    const reach = scored
      .filter(s => s.category === 'reach')
      .sort((a, b) => b.matchScore - a.matchScore);
    const extremeReach = scored
      .filter(s => s.category === 'extremeReach')
      .sort((a, b) => b.matchScore - a.matchScore);

    const pick = (arr: Categorized[], n: number) => arr.slice(0, Math.max(0, n));
    const desired = { safe: 6, target: 6, reach: 5, extremeReach: 3 };
    let resSafe = pick(safe, desired.safe);
    let resTarget = pick(target, desired.target);
    let resReach = pick(reach, desired.reach);
    let resExtreme = pick(extremeReach, desired.extremeReach);

    let total = resSafe.length + resTarget.length + resReach.length + resExtreme.length;
    if (total < 20) {
      const remaining = 20 - total;
      const leftovers = scored
        .filter(s => ![...resSafe, ...resTarget, ...resReach, ...resExtreme].some(x => x.id === s.id))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, remaining);
      // Distribute leftovers to categories based on their original category
      leftovers.forEach(item => {
        if (item.category === 'safe') resSafe.push(item);
        else if (item.category === 'target') resTarget.push(item);
        else if (item.category === 'reach') resReach.push(item);
        else resExtreme.push(item);
      });
      total = resSafe.length + resTarget.length + resReach.length + resExtreme.length;
    }

    // Ensure exactly 20 overall by trimming overflow if any
    const all = [...resSafe, ...resTarget, ...resReach, ...resExtreme]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20);

    res.json({
      profile: {
        gpa: studentGpa || undefined,
        sat: studentSat || undefined,
        act: studentAct || undefined,
        interests,
        preferences: { type: preferredType, region: preferredRegion, size: preferredSize, maxTuition: isFinite(maxTuition) ? maxTuition : undefined }
      },
      categories: {
        safe: resSafe.slice(0, 20),
        target: resTarget.slice(0, 20),
        reach: resReach.slice(0, 20),
        extremeReach: resExtreme.slice(0, 20)
      },
      recommendations: all,
      total: all.length
    });
  } catch (error) {
    console.error('Smart match error:', error);
    res.status(500).json({ message: 'Error generating smart matches' });
  }
});
