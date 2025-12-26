
import { Editor, User, Transaction, Rating } from './types';

// Mock initial data
const INITIAL_EDITORS: Editor[] = [
  { id: '1', name: 'Zade FX', thumbnail: 'https://picsum.photos/seed/zade/800/450', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', votes: 124 },
  { id: '2', name: 'Nebula Edits', thumbnail: 'https://picsum.photos/seed/nebula/800/450', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', votes: 89 },
  { id: '3', name: 'Ghost Vfx', thumbnail: 'https://picsum.photos/seed/ghost/800/450', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', votes: 210 },
  { id: '4', name: 'Krono', thumbnail: 'https://picsum.photos/seed/krono/800/450', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', votes: 56 },
];

export const db = {
  getEditors: (): Editor[] => {
    const data = localStorage.getItem('oryn_editors');
    return data ? JSON.parse(data) : INITIAL_EDITORS;
  },
  saveEditors: (editors: Editor[]) => {
    localStorage.setItem('oryn_editors', JSON.stringify(editors));
  },
  getUsers: (): User[] => {
    const data = localStorage.getItem('oryn_users');
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem('oryn_users', JSON.stringify(users));
  },
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem('oryn_transactions');
    return data ? JSON.parse(data) : [];
  },
  saveTransactions: (txs: Transaction[]) => {
    localStorage.setItem('oryn_transactions', JSON.stringify(txs));
  },
  getRatings: (): Rating[] => {
    const data = localStorage.getItem('oryn_ratings');
    return data ? JSON.parse(data) : [];
  },
  saveRatings: (ratings: Rating[]) => {
    localStorage.setItem('oryn_ratings', JSON.stringify(ratings));
  }
};
