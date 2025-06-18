// // screens/patient/AppointmentScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import AppointmentService from '../../services/appointmentService';
// import DoctorService from '../../services/doctorService';
// import CustomButton from '../../components/common/Button';

// const AppointmentScreen = ({ navigation }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     const loadDoctors = async () => {
//       try {
//         const data = await DoctorService.getAllDoctors();
//         setDoctors(data);
//       } catch (error) {
//         console.error('Failed to load doctors', error);
//       }
//     };
//     loadDoctors();
//   }, []);

//   const handleBookAppointment = async () => {
//     try {
//       await AppointmentService.bookAppointment({
//         doctorId: selectedDoctor,
//         dateTime: date.toISOString(),
//         serviceId: 1 // ID dịch vụ
//       });
//       navigation.navigate('AppointmentSuccess');
//     } catch (error) {
//       alert(`Đặt lịch thất bại: ${error}`);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Đặt lịch khám</Text>
//       {/* UI chọn bác sĩ, ngày giờ */}
//       <CustomButton 
//         title="Đặt lịch ngay"
//         onPress={handleBookAppointment}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
// });

// export default AppointmentScreen;