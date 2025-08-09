'use client';

import { useState } from 'react';
import api from '@/lib/api';

export interface AidInput {
  familyIncome: number;
  assets?: number;
  householdSize?: number;
}

export interface AidResult {
  efc: number;
  sticker: number;
  estimatedGrant: number;
  estimatedNet: number;
}

export function useAidEstimate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AidResult | null>(null);

  const estimate = async (input: AidInput) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      const { data } = await api.post('/tools/aid-estimate', input);
      setResult(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to estimate aid');
    } finally {
      setLoading(false);
    }
  };

  return { estimate, result, loading, error };
}

export default useAidEstimate;


