import api from './api';

export const getPatientInvoices = async (patientId) => {
    const response = await api.get(`/invoices/by-patient/${patientId}`);
    return response;
};

export const getInvoiceDetail = async (invoiceId) => {
  try {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};