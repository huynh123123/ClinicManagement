import { finishAppointmentApi } from "../../Api/Doctor/AppointmentApi";

export const finishAppointmentService = async (appointmentId) => {
    try {
        finishAppointmentApi(appointmentId);
        return true;
    } catch (error) {
        console.error('Error finishing appointment:', error);
        throw error;
    }
}