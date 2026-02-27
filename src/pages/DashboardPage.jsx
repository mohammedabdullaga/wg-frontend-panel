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
          data = await request(Endpoints.overview);
        } catch {
          const v = await request(Endpoints.vouchers);
          const s = await request(Endpoints.subscriptions);
          data = {
            totalVouchers: v.length,
            redeemedVouchers: v.filter(x => x.is_redeemed).length,
            activeSubs: s.filter(x => x.status === 'active').length,
            expiredSubs: s.filter(x => x.status !== 'active').length,
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
        <div className="p-4 border"><strong>Active subs:</strong> {counts.activeSubs || 0}</div>
        <div className="p-4 border"><strong>Expired/disabled subs:</strong> {counts.expiredSubs || 0}</div>
        <div className="p-4 border"><strong>Total vouchers:</strong> {counts.totalVouchers || 0}</div>
        <div className="p-4 border"><strong>Redeemed vouchers:</strong> {counts.redeemedVouchers || 0}</div>
      </div>
    </div>
  );
}

