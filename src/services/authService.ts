import api from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from './types/authType';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean }> {
    try {
      const response = await api.post<{ success: boolean }>('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};