import React, { useEffect, useState } from 'react';
import { request } from '../services/api';
import { Endpoints } from '../config/api';

export default function WgStatusPage() {
  const [status, setStatus] = useState(null);
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(Endpoints.wgStatus, { headers: { 'Content-Type': 'application/json' } });
        const text = await res.text();
        setRaw(text);
        try {
          const obj = JSON.parse(text);
          setStatus(obj);
        } catch (_e) {
          throw new Error('invalid json');
        }
      } catch (e) {
        setError(e.message || 'failed to fetch');
      }
    })();
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!status) return <div className="p-4">Loading…</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">WireGuard Status</h1>
      {status.interface && (
        <div className="mb-4">
          <strong>Interface:</strong> {status.interface.name} ({status.interface.publicKey}) port {status.interface.listenPort}
        </div>
      )}
      <div className="table-responsive">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>PublicKey</th>
              <th>Endpoint</th>
              <th>Allowed IPs</th>
              <th>Last Handshake</th>
              <th>RX</th>
              <th>TX</th>
              <th>Keepalive</th>
            </tr>
          </thead>
          <tbody>
            {status.peers && status.peers.map(p => (
              <tr key={p.publicKey}>
                <td>{p.publicKey.slice(0, 8)}…</td>
                <td>{p.endpoint || '-'}</td>
                <td>{p.allowedIps.join(', ')}</td>
                <td>{p.latestHandshakeEpoch ? new Date(p.latestHandshakeEpoch * 1000).toLocaleString() : 'never'}</td>
                <td>{p.rxBytes}</td>
                <td>{p.txBytes}</td>
                <td>{p.persistentKeepalive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* if parsing failed show raw */}
      {status === null && raw && (
        <pre className="mt-4">{raw}</pre>
      )}
    </div>
  );
}
