import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Endpoints } from '../config/api';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await request(Endpoints.subscriptions);
        setSubs(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const shown = subs.filter(s =>
    filter === '' ||
    (s.email && s.email.includes(filter)) ||
    (s.phone && s.phone.includes(filter)) ||
    (s.voucher_code && s.voucher_code.includes(filter))
  );

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Subscriptions</h1>
      <input
        type="text"
        placeholder="search email/phone/voucher"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="p-2 border mb-4"
      />
      {error && <div className="text-red-600">{error}</div>}
      <div className="table-responsive">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Expires</th>
              <th>IP</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(s => (
              <tr key={s.id}>
                <td data-label="Email">{s.email}</td>
                <td data-label="Phone">{s.phone}</td>
                <td data-label="Status">{s.status}</td>
                <td data-label="Expires">{s.expires_at}</td>
                <td data-label="IP">{s.ip_address}</td>
                <td data-label="Created">{s.created_at}</td>
                <td data-label="Actions">
                  <button onClick={() => navigate(`/subscriptions/${s.id}`)}>View</button>
                  {s.status === 'active' ? (
                    <button onClick={() => request(Endpoints.disableSubscription(s.id), { method: 'PUT' }).then(() => window.location.reload())}>Disable</button>
                  ) : (
                    <button onClick={() => request(Endpoints.enableSubscription(s.id), { method: 'PUT' }).then(() => window.location.reload())}>Enable</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
