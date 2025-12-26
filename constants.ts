
export const GOOGLE_CLIENT_ID = '1027735078146-l610f2vn1cnm4o791d4795m07fdq9gd2.apps.googleusercontent.com';

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

// Dynamically set countdown to 4 days from now for live effect
export const TARGET_DATE = Date.now() + (4 * 24 * 60 * 60 * 1000);
