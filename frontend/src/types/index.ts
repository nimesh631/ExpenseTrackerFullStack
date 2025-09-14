export interface User {
    id: number;
    email: string;
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  user: User;
}

export interface AuthResponse {
    access_token: string;
}