export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    role: 'Admin' | 'Doctor' | 'Patient';
    fullName: string;
    email: string;
  };
}