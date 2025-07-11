import { fetchRecordByAppointmentId } from '../../Api/Doctor/RecordApi';

export const fetchRecordByAppointmentIdService = async (appointmentId) => {
    try {
        return await fetchRecordByAppointmentId(appointmentId);
    } catch (error) {
        console.error('Error fetching record:', error);
        throw error;
    }
}