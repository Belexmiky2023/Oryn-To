
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  votedForId?: string;
  role: 'user' | 'admin';
  createdAt: number;
}

export interface Editor {
  id: string;
  name: string;
  thumbnail: string;
  videoUrl: string;
  votes: number;
  description?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userEmail: string;
  stars: number;
  votes: number;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

export interface Rating {
  id: string;
  userId: string;
  userEmail: string;
  score: number;
  timestamp: number;
}

export interface AppState {
  currentUser: User | null;
  editors: Editor[];
  transactions: Transaction[];
  ratings: Rating[];
  isLoading: boolean;
}
