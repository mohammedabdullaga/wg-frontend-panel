import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Endpoints } from '../config/api';

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState(30);
  const [success, setSuccess] = useState('');

  const load = async () => {
    try {
      const data = await request(Endpoints.vouchers);
      setVouchers(data.items);
      setTotal(data.count);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreating(true);
    try {
      await request(Endpoints.createVoucher, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: +count, durationDays: +duration }),
      });
      setSuccess(`Created ${count} voucher${count>1?'s':''}`);
      setCount(1);
      setDuration(30);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Vouchers ({total})</h1>
      <form onSubmit={submit} className="mb-4 flex flex-wrap items-end gap-2">
        <div>
          <label>Count</label>
          <input
            type="number"
            value={count}
            min="1"
            onChange={(e) => setCount(e.target.value)}
            className="border px-1 w-20"
          />
        </div>
        <div>
          <label>Duration (days)</label>
          <input
            type="number"
            value={duration}
            min="1"
            onChange={(e) => setDuration(e.target.value)}
            className="border px-1 w-20"
          />
        </div>
        <button type="submit" disabled={creating} className="bg-blue-500 text-white px-3 py-1">
          {creating ? 'Creating…' : 'Create'}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
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
                <td data-label="Created">{new Date(v.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
