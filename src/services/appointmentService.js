// services/appointmentService.js
import api from './api';

// Lấy lịch hẹn của bệnh nhân
export const getPatientAppointments = async (token) => {
  const response = await api.get('/appointments/my-appointments', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Hủy lịch hẹn
export const cancelAppointment = async (appointmentId, token) => {
  const response = await api.delete(`/appointments/${appointmentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Đặt lịch hẹn mới
export const bookAppointment = async (appointmentData, token) => {
  const response = await api.post('/appointments', appointmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Lấy lịch khám còn trống theo bác sĩ và ngày
export const getAvailableSchedules = async (doctorId, date, token) => {
  const response = await api.get(
    `/appointments/doctors/${doctorId}/available-schedules`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }
    }
  );
  return response.data;
};
