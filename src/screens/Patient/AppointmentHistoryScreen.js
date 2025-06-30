import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../../services/api';

export default function AppointmentHistoryScreen() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments/by-patient/6').then(res => setAppointments(res.data));
  }, []);

  return (
    <FlatList
      data={appointments}
      keyExtractor={item => item.AppointmentID.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text>Bác sĩ: {item.DoctorName}</Text>
          <Text>Ngày: {item.WorkDate} - {item.Shift}</Text>
          <Text>Trạng thái: {item.Status}</Text>
        </View>
      )}
    />
  );
}