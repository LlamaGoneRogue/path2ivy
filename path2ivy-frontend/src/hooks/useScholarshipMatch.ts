'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export function useScholarshipMatch(profile?: any) {
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [digest, setDigest] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.post('/scholarships/match', { profile });
        if (!cancelled) {
          setRecommendations(data?.recommendations || []);
          setDigest(data?.digest || null);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.response?.data?.message || 'Failed to match scholarships');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  return { recommendations, digest, loading, error };
}

export default useScholarshipMatch;


