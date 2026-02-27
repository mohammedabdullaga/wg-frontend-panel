import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import VouchersPage from './pages/VouchersPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SubscriptionDetailsPage from './pages/SubscriptionDetailsPage';
import SettingsPage from './pages/SettingsPage';
import WgStatusPage from './pages/WgStatusPage';
import Layout from './components/Layout';
import { useAuth } from './hooks/useAuth';

function Private({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Private>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/vouchers" element={<VouchersPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/subscriptions/:id" element={<SubscriptionDetailsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/wg-status" element={<WgStatusPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Private>} />
    </Routes>
  );
}
