import api from './api';

export const getDoctorsByDepartment = async (departmentId) => {
  const res = await api.get(`/doctors/by-department/${departmentId}`);
  return res.data;
};

export const getFeaturedDoctors = async () => {
  const res = await api.get('/doctors/featured');
  return res;
};

export const getDoctorDetail = async (doctorId) => {
  const res = await api.get(`/doctors/${doctorId}`);
  return res.data;
};

export const getAllDoctors = async () => {
  const res = await api.get('/doctors');
  return res;
};