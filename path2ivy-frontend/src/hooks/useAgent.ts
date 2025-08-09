'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useAgentStream() {
  const [connected, setConnected] = useState(false);
  const [digest, setDigest] = useState<any | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';
    const url = base.replace(/\/$/, '').replace(/\/api$/, '') + '/api/agent/stream';
    const es = new EventSource(url);
    esRef.current = es;
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.addEventListener('agent-update', (evt) => {
      try { setDigest(JSON.parse((evt as MessageEvent).data)); } catch {}
    });
    return () => { es.close(); setConnected(false); };
  }, []);

  return { connected, digest };
}

export function useAgentControls() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any | null>(null);

  const request = useCallback(async (path: string, body?: any) => {
    try {
      setLoading(true); setError(null);
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';
      const url = base.replace(/\/$/, '') + path;
      const resp = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json?.message || 'Request failed');
      return json;
    } catch (e: any) {
      setError(e.message || 'Request failed');
      return null;
    } finally { setLoading(false); }
  }, []);

  const enable = useCallback(async (topics?: string[], frequencyMinutes?: number) => {
    const json = await request('/agent/enable', { topics, frequencyMinutes });
    if (json?.config) setConfig(json.config);
    return json;
  }, [request]);

  const disable = useCallback(async () => {
    const json = await request('/agent/disable');
    if (json?.message) setConfig((c: any) => ({ ...(c || {}), enabled: false }));
    return json;
  }, [request]);

  return { enable, disable, loading, error, config };
}

export default useAgentStream;


