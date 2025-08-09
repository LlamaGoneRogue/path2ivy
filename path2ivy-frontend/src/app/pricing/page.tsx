'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircleIcon, SparklesIcon, ClockIcon, AcademicCapIcon, BellIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const features = [
  { title: 'Unlimited AI guidance', desc: 'Daily roadmaps, essay ideas & feedback (fair use)', icon: SparklesIcon },
  { title: 'Pro college matching', desc: '20+ ranked recommendations with reasons', icon: AcademicCapIcon },
  { title: 'Scholarship auto-matching', desc: 'Weekly digest + deadline alerts', icon: BellIcon },
  { title: 'Application tracker', desc: 'Deadlines, checklist, calendar sync', icon: ClockIcon },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">Path2Ivy</span>
          </div>
          <nav className="hidden sm:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            <Link href="/mentors" className="text-gray-600 hover:text-blue-600">Mentors</Link>
            <Link href="/colleges" className="text-gray-600 hover:text-blue-600">Colleges</Link>
          </nav>
          <Link href="/register" className="btn-primary btn-sm">Get Started</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900">Path2Ivy Premium</h1>
          <p className="mt-3 text-lg text-gray-600">Everything you need to compete for selective colleges—guided, organized, and supported.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900">Free</h3>
            <p className="text-gray-500 mt-1">Get started</p>
            <div className="mt-4 text-4xl font-bold">$0<span className="text-base font-medium text-gray-500">/mo</span></div>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                'Basic AI plans (limits apply)',
                'Starter college list',
                'Manual application tracking',
                'Community Q&A access',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/register" className="mt-6 inline-flex items-center justify-center w-full btn-ghost">Create free account</Link>
          </motion.div>

          {/* Premium */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative bg-white rounded-xl shadow-lg border-2 border-blue-600 p-6">
            <span className="absolute -top-3 left-6 text-xs bg-blue-600 text-white px-2 py-1 rounded">Best Value</span>
            <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
            <p className="text-gray-500 mt-1">For selective college candidates</p>
            <div className="mt-4 flex items-end space-x-3">
              <div className="text-4xl font-bold">$12.99<span className="text-base font-medium text-gray-500">/mo</span></div>
              <div className="text-gray-500">or $99/year</div>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {features.map(({ title, desc, icon: Icon }) => (
                <li key={title} className="flex items-start">
                  <Icon className="w-4 h-4 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium text-gray-900">{title}</div>
                    <div className="text-gray-600">{desc}</div>
                  </div>
                </li>
              ))}
              <li className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 mr-2" />
                <span className="text-gray-700">7‑day free trial • cancel anytime</span>
              </li>
            </ul>
            <Link href="/register" className="mt-6 inline-flex items-center justify-center w-full btn-primary">
              Start free trial
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          
        </div>

        {/* FAQ / Notes */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-600">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-gray-900 font-semibold mb-3">Fair use & SLAs</h4>
            <p>- AI calls: soft cap to ensure quality. Essay reviews: 48h turnaround. Mentor matches: &lt; 24h.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-gray-900 font-semibold mb-3">Scholarship ROI Promise</h4>
            <p>If you receive no awards after 12 months of Premium, we’ll add 3 months free.</p>
          </div>
        </div>
      </main>
    </div>
  );
}


