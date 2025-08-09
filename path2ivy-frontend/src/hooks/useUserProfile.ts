"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/auth/me');
        if (!cancelled) setProfile(data);
      } catch (e: any) {
        if (!cancelled) setError(e?.response?.data?.message || 'Failed to fetch profile');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);

  return { profile, loading, error };
}

export default useUserProfile;
