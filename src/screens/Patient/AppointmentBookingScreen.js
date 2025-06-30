import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from '../../services/api';

export default function AppointmentBookingScreen({ route, navigation }) {
  const { doctorId } = route.params || {};
  const [reason, setReason] = useState('');

  const book = () => {
    api.post('/appointments/book', {
      PatientID: 6,
      DoctorID: doctorId || 2,
      ScheduleID: 1,
      BookingFor: 'Nguyễn Văn A',
      Reason: reason
    })
    .then(() => {
      Alert.alert('Đặt lịch thành công');
      navigation.navigate('Appointments');
    })
    .catch(err => Alert.alert('Lỗi', err.message));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Lý do khám"
        value={reason}
        onChangeText={setReason}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
      />
      <Button title="Đặt lịch" onPress={book} />
    </View>
  );
}
