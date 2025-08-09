'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Protected from '@/components/Protected';
import { motion } from 'framer-motion';
import { SparklesIcon, AcademicCapIcon, CalendarIcon, GlobeAltIcon, CommandLineIcon, BeakerIcon, BriefcaseIcon, UserGroupIcon, MapIcon } from '@heroicons/react/24/outline';

type RoadmapRequest = {
  profile: {
    currentGrade?: '9' | '10' | '11' | '12';
    gpa?: number;
    sat?: number;
    act?: number;
    apIBCourses?: string[];
    courseworkRigor?: 'standard' | 'honors' | 'AP/IB';
  };
  majorPreferences: string[];
  targetRegions?: string[];
  collegeType?: 'public' | 'private' | 'any';
  sizePreference?: 'small' | 'medium' | 'large' | 'any';
  budgetMaxTuition?: number;
  extracurriculars: string[];
  constraints?: {
    workHoursPerWeek?: number;
    familyResponsibilities?: boolean;
    athleticCommitments?: boolean;
  };
  goals?: {
    targetSAT?: number;
    targetACT?: number;
    targetAPs?: number;
    leadership?: boolean;
    research?: boolean;
    competition?: boolean;
  };
};

type RoadmapSection = {
  term: string; // e.g., "Fall 11th"
  courses: string[];
  testing: string[];
  extracurriculars: string[];
  milestones: string[];
};

type RoadmapResponse = {
  summary: string;
  sections: RoadmapSection[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export default function RoadmapPage() {
  const [form, setForm] = useState<RoadmapRequest>({
    profile: { currentGrade: '11', gpa: 3.8, sat: 1480, courseworkRigor: 'AP/IB', apIBCourses: ['AP CS A', 'AP Calc BC'] },
    majorPreferences: ['Computer Science', 'Business'],
    targetRegions: ['Northeast', 'West Coast'],
    collegeType: 'any',
    sizePreference: 'any',
    budgetMaxTuition: 65000,
    extracurriculars: ['Robotics', 'DECA', 'Volunteering'],
    constraints: { workHoursPerWeek: 5, familyResponsibilities: false, athleticCommitments: false },
    goals: { targetSAT: 1520, leadership: true, research: true }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RoadmapResponse | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.post<RoadmapResponse>(`${API_BASE}/ai/roadmap`, {
        profile: form.profile,
        majorPreferences: form.majorPreferences,
        targetRegions: form.targetRegions,
        collegeType: form.collegeType,
        sizePreference: form.sizePreference,
        budgetMaxTuition: form.budgetMaxTuition,
        extracurriculars: form.extracurriculars,
        constraints: form.constraints,
        goals: form.goals
      });

      setData(resp.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaveMessage(null);
    try {
      const title = `AI Roadmap - ${form.majorPreferences.join(', ') || 'General'}`;
      const deadline = new Date();
      deadline.setMonth(deadline.getMonth() + 6);
      await axios.post(`${API_BASE}/action-plans`, {
        title,
        college: 'N/A',
        deadline: deadline.toISOString(),
        roadmap: data,
      });
      setSaveMessage('Saved to Action Plans');
      setTimeout(() => setSaveMessage(null), 2500);
    } catch (e) {
      setSaveMessage('Failed to save');
      setTimeout(() => setSaveMessage(null), 2500);
    }
  };

  const Pill = ({ text, onRemove }: { text: string; onRemove?: () => void }) => (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
      {text}
      {onRemove && <button type="button" className="ml-1 text-blue-500" onClick={onRemove}>×</button>}
    </span>
  );

  return (
    <Protected>
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GlobeAltIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">Path2Ivy</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link href="/colleges" className="text-gray-600 hover:text-blue-600">College Matching</Link>
            <span className="text-blue-600 font-medium">AI Roadmap</span>
          </div>
        </div>
      </nav>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="card lg:col-span-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-primary-600" /> Generate Your AI Roadmap</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Current Grade</label>
                  <select className="input" value={form.profile.currentGrade || ''} onChange={e => setForm(f => ({ ...f, profile: { ...f.profile, currentGrade: e.target.value as any } }))}>
                    <option value="">Select</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div>
                  <label className="label">GPA</label>
                  <input type="number" step="0.01" min="0" max="4" className="input" value={form.profile.gpa ?? ''} onChange={e => setForm(f => ({ ...f, profile: { ...f.profile, gpa: Number(e.target.value) } }))} />
                </div>
                <div>
                  <label className="label">SAT</label>
                  <input type="number" min="0" max="1600" className="input" value={form.profile.sat ?? ''} onChange={e => setForm(f => ({ ...f, profile: { ...f.profile, sat: Number(e.target.value) } }))} />
                </div>
                <div>
                  <label className="label">ACT</label>
                  <input type="number" min="0" max="36" className="input" value={form.profile.act ?? ''} onChange={e => setForm(f => ({ ...f, profile: { ...f.profile, act: Number(e.target.value) } }))} />
                </div>
                <div className="col-span-2">
                  <label className="label">AP/IB Courses</label>
                  <input type="text" placeholder="Comma-separated (e.g., AP CS A, AP Calc BC)" className="input" value={(form.profile.apIBCourses || []).join(', ')} onChange={e => setForm(f => ({ ...f, profile: { ...f.profile, apIBCourses: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } }))} />
                </div>
              </div>

              <div>
                <label className="label flex items-center"><AcademicCapIcon className="w-4 h-4 mr-2" /> Intended Majors</label>
                <input type="text" className="input" placeholder="Comma-separated (e.g., Computer Science, Business)" value={form.majorPreferences.join(', ')} onChange={e => setForm(f => ({ ...f, majorPreferences: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label"><MapIcon className="w-4 h-4 mr-2 inline" /> Regions</label>
                  <input type="text" className="input" placeholder="Comma-separated (e.g., Northeast, West Coast)" value={(form.targetRegions || []).join(', ')} onChange={e => setForm(f => ({ ...f, targetRegions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                </div>
                <div>
                  <label className="label">College Type</label>
                  <select className="input" value={form.collegeType} onChange={e => setForm(f => ({ ...f, collegeType: e.target.value as any }))}>
                    <option value="any">Any</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="label">Size</label>
                  <select className="input" value={form.sizePreference} onChange={e => setForm(f => ({ ...f, sizePreference: e.target.value as any }))}>
                    <option value="any">Any</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label flex items-center"><UserGroupIcon className="w-4 h-4 mr-2" /> Extracurriculars</label>
                <input type="text" className="input" placeholder="Comma-separated" value={form.extracurriculars.join(', ')} onChange={e => setForm(f => ({ ...f, extracurriculars: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label flex items-center"><BriefcaseIcon className="w-4 h-4 mr-2" /> Work (hrs/week)</label>
                  <input type="number" min="0" className="input" value={form.constraints?.workHoursPerWeek ?? 0} onChange={e => setForm(f => ({ ...f, constraints: { ...f.constraints, workHoursPerWeek: Number(e.target.value) } }))} />
                </div>
                <div>
                  <label className="label">Family Responsibilities</label>
                  <select className="input" value={form.constraints?.familyResponsibilities ? 'yes' : 'no'} onChange={e => setForm(f => ({ ...f, constraints: { ...f.constraints, familyResponsibilities: e.target.value === 'yes' } }))}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="label">Athletic Commitments</label>
                  <select className="input" value={form.constraints?.athleticCommitments ? 'yes' : 'no'} onChange={e => setForm(f => ({ ...f, constraints: { ...f.constraints, athleticCommitments: e.target.value === 'yes' } }))}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label flex items-center"><BeakerIcon className="w-4 h-4 mr-2" /> Goals</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Target SAT</label>
                    <input type="number" min="0" max="1600" className="input" value={form.goals?.targetSAT ?? ''} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, targetSAT: Number(e.target.value) } }))} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Target ACT</label>
                    <input type="number" min="0" max="36" className="input" value={form.goals?.targetACT ?? ''} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, targetACT: Number(e.target.value) } }))} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Target # of APs</label>
                    <input type="number" min="0" className="input" value={form.goals?.targetAPs ?? ''} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, targetAPs: Number(e.target.value) } }))} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <label className="inline-flex items-center text-sm text-gray-600"><input type="checkbox" className="mr-2" checked={!!form.goals?.leadership} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, leadership: e.target.checked } }))} /> Leadership</label>
                  <label className="inline-flex items-center text-sm text-gray-600"><input type="checkbox" className="mr-2" checked={!!form.goals?.research} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, research: e.target.checked } }))} /> Research</label>
                  <label className="inline-flex items-center text-sm text-gray-600"><input type="checkbox" className="mr-2" checked={!!form.goals?.competition} onChange={e => setForm(f => ({ ...f, goals: { ...f.goals, competition: e.target.checked } }))} /> Competitions</label>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Generating…' : 'Generate Roadmap'}</button>
              {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="lg:col-span-2">
            {!data && (
              <div className="card text-center py-16">
                <CalendarIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">Provide your details to generate a tailored roadmap</h3>
                <p className="text-gray-600 text-sm mt-1">We align terms, courses, testing cadence, extracurriculars, and milestones to your goals.</p>
              </div>
            )}
            {data && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Your AI Roadmap</h2>
                      <p className="text-sm text-gray-600 mt-1">{data.summary}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={handleSave} className="btn-primary whitespace-nowrap">Save</button>
                    </div>
                  </div>
                  {saveMessage && <div className="text-sm mt-2 {saveMessage.includes('Saved') ? 'text-green-600' : 'text-red-600'}">{saveMessage}</div>}
                </div>
                <div className="space-y-4">
                  {data.sections.map((sec, idx) => (
                    <div key={idx} className="card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{sec.term}</h3>
                        <span className="badge-primary">Term Plan</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-800 mb-1">Courses</div>
                          <ul className="list-disc pl-5 text-gray-600 space-y-0.5">{sec.courses.map((c, i) => <li key={i}>{c}</li>)}</ul>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-1">Testing</div>
                          <ul className="list-disc pl-5 text-gray-600 space-y-0.5">{sec.testing.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-1">Extracurriculars</div>
                          <ul className="list-disc pl-5 text-gray-600 space-y-0.5">{sec.extracurriculars.map((x, i) => <li key={i}>{x}</li>)}</ul>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-1">Milestones</div>
                          <ul className="list-disc pl-5 text-gray-600 space-y-0.5">{sec.milestones.map((m, i) => <li key={i}>{m}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
    </Protected>
  );
}





