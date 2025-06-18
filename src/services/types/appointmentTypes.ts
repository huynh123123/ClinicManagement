export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDateTime: string;
  endDateTime: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface BookAppointmentData {
  doctorId: string;
  scheduledDateTime: string;
  endDateTime: string;
}