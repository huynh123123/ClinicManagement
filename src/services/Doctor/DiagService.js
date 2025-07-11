import { saveDiagnosisApi } from '../../Api/Doctor/DiagApi.js';

export const saveDiagnosisService = async (diagnosisData) => {
    try {
        return await saveDiagnosisApi(diagnosisData);
    } catch (error) {
        console.error("Error saving diagnosis:", error);
        throw error;
    }
};