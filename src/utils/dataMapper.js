export const mapDepartment = (dept) => ({
  id: dept.DepartmentID,
  name: dept.Name,
  description: dept.Description,
  // image: require('../assets/default-dept.png') // Hoặc dùng URL từ API
});

export const mapDoctor = (doctor) => ({
  id: doctor.UserID,
  name: doctor.FullName,
  specialty: doctor.SpecialtyName || 'Không xác định',
  rating: 4.5, // Giá trị mặc định hoặc từ API
  schedule: ['Mon', 'Wed', 'Fri'], // Lịch làm việc từ API
  // avatar: require('../assets/default-avatar.png') // Hoặc dùng URL từ API
});

export const mapAppointment = (appt) => ({
  id: appt.AppointmentID,
  date: appt.AppointmentDate.split('T')[0],
  time: appt.AppointmentDate.split('T')[1].substring(0, 5),
  doctor: appt.DoctorName,
  department: appt.SpecialtyName || 'Không xác định',
  status: appt.Status === 'Hoàn tất' ? 'completed' : 'pending'
});

export const mapInvoice = (invoice) => ({
  id: invoice.InvoiceID,
  code: `HD-${invoice.InvoiceID}`,
  date: new Date(invoice.CreatedAt).toLocaleDateString(),
  amount: `${invoice.TotalAmount.toLocaleString()} VND`,
  status: invoice.Paid ? 'paid' : 'unpaid'
});