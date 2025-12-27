
export const MAGIC_PUBLISHABLE_KEY = 'pk_live_15DF34DF13B4B960';

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

export const getTargetDate = (): number => {
  const FOUR_DAYS_MS = 4 * 24 * 60 * 60 * 1000;
  if (typeof window === 'undefined') return Date.now() + FOUR_DAYS_MS;
  
  try {
    const stored = localStorage.getItem('oryn_target_date_v2');
    if (stored) {
      const parsed = parseInt(stored, 10);
      return isNaN(parsed) ? (Date.now() + FOUR_DAYS_MS) : parsed;
    }
    const target = Date.now() + FOUR_DAYS_MS;
    localStorage.setItem('oryn_target_date_v2', target.toString());
    return target;
  } catch (error) {
    return Date.now() + FOUR_DAYS_MS;
  }
};

export const TARGET_DATE = getTargetDate;
