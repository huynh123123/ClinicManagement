import api from './api';
import { AxiosError } from 'axios';

const AppointmentService = {
  async bookAppointment(data: {
    doctorId: number;
    dateTime: string;
    serviceId: number;
  }) {
    try {
      const response = await api.post('/appointments', data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data || err.message;
    }
  },

  async getPatientAppointments(patientId: number) {
    const response = await api.get(`/patients/${patientId}/appointments`);
    return response.data;
  }
};

export default AppointmentService;
