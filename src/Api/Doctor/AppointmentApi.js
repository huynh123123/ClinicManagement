const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchAppointmentsByDoctorIdAndStatus = async (doctorId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/appointments?doctorId=${doctorId}&status=${status}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch appointments: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

export const finishAppointmentApi = async (appointmentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/appointment/finish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ appointmentId: String(appointmentId) }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to finish appointment: ${response.status}`);
        }
    } catch (error) {
        console.error('Error finishing appointment:', error);
        throw error;
    }
}