import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Endpoints } from '../config/api';

export default function DashboardPage() {
  const [counts, setCounts] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let data;
        try {
          // Try new /overview endpoint first
          data = await request(Endpoints.overview);
        } catch {
          // Fallback: fetch and compile manually
          const vData = await request(Endpoints.vouchers);
          const sData = await request(Endpoints.subscriptions);
          
          // Handle both old array format and new { items, count } format
          const vouchers = Array.isArray(vData) ? vData : (vData.items || []);
          const subscriptions = Array.isArray(sData) ? sData : (sData.items || []);
          
          data = {
            vouchers: {
              total: vouchers.length,
              redeemed: vouchers.filter(x => x.is_redeemed).length,
              available: vouchers.length - vouchers.filter(x => x.is_redeemed).length,
            },
            subscriptions: subscriptions.length,
            peers: 0,
          };
        }
        setCounts(data);
        setError('');
      } catch (e) {
        setError(e.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600"><strong>Error:</strong> {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border"><strong>Subscriptions:</strong> {counts.subscriptions || 0}</div>
        <div className="p-4 border"><strong>WireGuard Peers:</strong> {counts.peers || 0}</div>
        <div className="p-4 border"><strong>Total Vouchers:</strong> {counts.vouchers?.total || 0}</div>
        <div className="p-4 border"><strong>Redeemed:</strong> {counts.vouchers?.redeemed || 0}</div>
        <div className="p-4 border"><strong>Available:</strong> {counts.vouchers?.available || 0}</div>
      </div>
    </div>
  );
}

