import api from './api';
import { 
  Appointment, 
  BookAppointmentData 
} from './types/appointmentTypes';

export const patientService = {
  async getAppointments(): Promise<Appointment[]> {
    try {
      const response = await api.get<Appointment[]>('/patient/appointments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async bookAppointment(data: BookAppointmentData): Promise<Appointment> {
    try {
      const response = await api.post<Appointment>('/patient/appointments', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMedicalRecords(patientId: string): Promise<any> {
    try {
      const response = await api.get(`/patient/medical-records/${patientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};