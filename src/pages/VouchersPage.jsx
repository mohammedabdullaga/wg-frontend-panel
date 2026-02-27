import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Endpoints } from '../config/api';

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await request(Endpoints.vouchers);
        setVouchers(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Vouchers</h1>
      {error && <div className="text-red-600">{error}</div>}
      <div className="table-responsive">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Code</th>
              <th>Duration</th>
              <th>Redeemed</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(v => (
              <tr key={v.id}>
                <td data-label="Code">{v.code}</td>
                <td data-label="Duration">{v.duration_days}</td>
                <td data-label="Redeemed">{v.is_redeemed ? 'yes' : 'no'}</td>
                <td data-label="Created">{v.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
