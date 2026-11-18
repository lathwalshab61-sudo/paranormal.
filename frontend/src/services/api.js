const API_BASE = (typeof window !== 'undefined' && window.location.origin && window.location.origin.startsWith('http'))
  ? (window.location.hostname === 'localhost' && window.location.port !== '5000' && window.location.port !== ''
      ? 'http://localhost:5000/api'
      : `${window.location.origin}/api`)
  : 'http://localhost:5000/api';

export async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[BTU API Fallback] ${endpoint}: using local telemetry mock.`, err.message);
    return fallbackData;
  }
}

export async function postWithFallback(endpoint, body, fallbackResponse) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[BTU API Fallback] ${endpoint}: local simulate success.`, err.message);
    return fallbackResponse;
  }
}

