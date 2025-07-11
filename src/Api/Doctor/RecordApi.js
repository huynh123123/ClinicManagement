const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchRecordByAppointmentId = async (appointmentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/record?appointmentId=${appointmentId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch record: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching record:', error);
        throw error;
    }
}