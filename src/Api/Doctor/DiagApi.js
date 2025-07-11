const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const saveDiagnosisApi = async (diagnosisData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/AddDiagnosis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(diagnosisData),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to save diagnosis: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Error saving diagnosis:', error);
        throw error;
    }
};
