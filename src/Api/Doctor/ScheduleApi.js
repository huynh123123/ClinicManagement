const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchDoctorSchedule = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/schedule?doctorId=${doctorId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch doctor schedule: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching doctor schedule:', error);
        throw error;
    }
}