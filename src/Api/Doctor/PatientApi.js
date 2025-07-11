const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchPatientsByDoctorId = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/patients?doctorId=${doctorId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch patients: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}