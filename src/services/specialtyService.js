import api from './api';

export const getAllSpecialties = async () => {
  const res = await api.get('/special/specialties');
  return res;
};

export const getDoctorsBySpecialty = async (specialtyId) => {
    const response = await api.get(`/special/specialties/${specialtyId}/doctors`);
    return response;
};

export const getSpecialtyDetail = async (specialtyId) => {
  try {
    const response = await api.get(`/special/specialties/${specialtyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};