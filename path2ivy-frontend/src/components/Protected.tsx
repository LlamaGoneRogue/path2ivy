"use client";

import { ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Protected({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && !user) {
      const next = typeof window !== 'undefined' ? window.location.pathname : '';
      const redirectQuery = next && next !== '/login' ? `?next=${encodeURIComponent(next)}` : '';
      router.replace(`/login${redirectQuery}`);
    }
  }, [user, loading, router, searchParams]);

  if (loading) return null;
  if (!user) return null;
  return <>{children}</>;
}

