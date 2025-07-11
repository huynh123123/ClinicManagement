import api from './api';

/**
 * Lấy danh sách hồ sơ bệnh án của bệnh nhân
 */
export const getPatientRecords = async (patientId) => {
    const response = await api.get(`/medical/patients/${patientId}/records`);
    return response;
};

/**
 * Lấy chi tiết một hồ sơ bệnh án
 */
export const getRecordDetail = async (recordId) => {

    const response = await api.get(`/medical/records/${recordId}`);
    return response; // Trả thẳng object record
};

/**
 * Tạo mới hồ sơ bệnh án
 */
export const createMedicalRecord = async (recordData) => {
    const response = await api.post('/medical/records', recordData);
    return response.data;
};

/**
 * Cập nhật hồ sơ bệnh án
 */
export const updateMedicalRecord = async (
    recordId,
    updates
) => {
    const response = await api.put(`/medical/records/${recordId}`, updates);
    return response.data;
};

/**
 * Lấy lịch sử khám bệnh của bệnh nhân
 */
export const getExaminationHistory = async (patientId) => {
    const response = await api.get(`/medical/patients/${patientId}/history`);
    return response.data;
};
