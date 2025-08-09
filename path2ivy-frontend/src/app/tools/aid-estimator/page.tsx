'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAidEstimate } from '@/hooks/useAidEstimate';

export default function AidEstimatorPage() {
  const { estimate, result, loading, error } = useAidEstimate();
  const [familyIncome, setFamilyIncome] = useState('65000');
  const [assets, setAssets] = useState('10000');
  const [householdSize, setHouseholdSize] = useState('3');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await estimate({ familyIncome: Number(familyIncome), assets: Number(assets || 0), householdSize: Number(householdSize || 3) });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-bold">Path2Ivy</Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Aid Estimator</h1>
          <p className="text-gray-600 mb-8">Estimate your Expected Family Contribution (EFC), grants, and net cost.</p>

          <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Family Income (annual, USD)</label>
              <input className="input" type="number" value={familyIncome} onChange={(e) => setFamilyIncome(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Assets (optional, USD)</label>
              <input className="input" type="number" value={assets} onChange={(e) => setAssets(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Household Size</label>
              <input className="input" type="number" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} />
            </div>
            <button disabled={loading} className="btn-primary">{loading ? 'Estimating...' : 'Estimate Aid'}</button>
            {error && <div className="text-sm text-red-600">{error}</div>}
          </form>

          {result && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <div className="text-sm text-gray-500">Expected Family Contribution (EFC)</div>
                <div className="text-2xl font-bold">${result.efc.toLocaleString()}</div>
              </div>
              <div className="card">
                <div className="text-sm text-gray-500">Sticker Price (est.)</div>
                <div className="text-2xl font-bold">${result.sticker.toLocaleString()}</div>
              </div>
              <div className="card">
                <div className="text-sm text-gray-500">Estimated Grant</div>
                <div className="text-2xl font-bold text-green-600">${result.estimatedGrant.toLocaleString()}</div>
              </div>
              <div className="card">
                <div className="text-sm text-gray-500">Estimated Net Cost</div>
                <div className="text-2xl font-bold text-blue-600">${result.estimatedNet.toLocaleString()}</div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}


