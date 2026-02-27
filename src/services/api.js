import { API_BASE } from '../config/api';
import { clearToken } from '../auth/auth';

// simple wrapper around fetch that injects token and handles 401 logout
export async function request(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = opts.token || localStorage.getItem('wg_admin_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(API_BASE + path, { ...opts, headers });
    if (res.status === 401) {
      clearToken();
      window.location.href = '/login';
      throw new Error('unauthorized');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      throw new Error('invalid json');
    }
  } catch (e) {
    console.error('API error:', e);
    throw e;
  }
}

