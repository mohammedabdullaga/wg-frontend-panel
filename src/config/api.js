export const API_BASE = import.meta.env.VITE_API_BASE || 'https://appleapi.playmetod.store';
console.log('API_BASE configured as:', API_BASE);

export const Endpoints = {
  login: '/api/admin/login',
  vouchers: '/api/admin/vouchers',
  createVoucher: '/api/admin/vouchers', // POST to same path for compatibility
  // legacy alias (previous versions)
  createVouchers: '/api/admin/vouchers',
  subscriptions: '/api/admin/subscriptions',
  subscription: id => `/api/admin/subscription/${id}`,
  disableSubscription: id => `/api/admin/subscription/${id}/disable`,
  enableSubscription: id => `/api/admin/subscription/${id}/enable`,
  extendSubscription: id => `/api/admin/subscription/${id}/extend`,
  settings: '/api/admin/settings',
  wgStatus: '/api/admin/wg/status',
  overview: '/api/admin/overview',
  subscriptionConfig: id => `/api/admin/subscription/${id}/config`,
  subscriptionQr: id => `/api/admin/subscription/${id}/qr`,
};
