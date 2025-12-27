
export const GOOGLE_CLIENT_ID = '1027735078146-i8dpdphii7pkkpte70rhbcuksb00gonh.apps.googleusercontent.com';

export const COLORS = {
  neonGreen: '#39FF14',
  black: '#000000',
  darkGray: '#090909',
  glassWhite: 'rgba(255, 255, 255, 0.05)',
};

export const ROUTES = {
  HOME: '/',
  VOTE: '/vote',
  GIFT: '/gift',
  RATE: '/rate',
  ADMIN: '/admin-secret-portal',
};

export const GIFT_PACKAGES = [
  { stars: 1, votes: 2, id: 'pkg-1' },
  { stars: 15, votes: 35, id: 'pkg-2' }
];

// Persistent 4-day target date from the moment the app is first visited
const getPersistentTarget = () => {
  const stored = localStorage.getItem('oryn_target_date_v2');
  if (stored) return parseInt(stored);
  
  // Set to 4 days from "now"
  const target = Date.now() + (4 * 24 * 60 * 60 * 1000);
  localStorage.setItem('oryn_target_date_v2', target.toString());
  return target;
};

export const TARGET_DATE = getPersistentTarget();
