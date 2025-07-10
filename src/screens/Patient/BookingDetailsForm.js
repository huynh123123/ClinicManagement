// src/screens/Booking/BookingDetailsForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { bookAppointment } from '../../services/appointmentService';

const BookingDetailsForm = ({ route, navigation }) => {
  const { appointmentId } = route.params;
  const [bookingFor, setBookingFor] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    if (!bookingFor || !reason) {
      return Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
    }

    try {
      await bookAppointment(appointmentId, {
        BookingFor: bookingFor,
        Reason: reason,
      });

      Alert.alert('Thành công', 'Đã cập nhật thông tin lịch hẹn');
      navigation.navigate('Home'); // hoặc 'AppointmentHistory'
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin đặt khám</Text>

      <Text style={styles.label}>Người được khám</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: Nguyễn Văn A"
        value={bookingFor}
        onChangeText={setBookingFor}
      />

      <Text style={styles.label}>Lý do khám</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: Đau đầu, mệt mỏi..."
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingDetailsForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: '600', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  button: {
    marginTop: 25,
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
