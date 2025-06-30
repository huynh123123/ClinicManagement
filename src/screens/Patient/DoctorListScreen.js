import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../../services/api';

export default function DoctorListScreen({ route, navigation }) {
  const { departmentId } = route.params || {};
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (departmentId) {
      api.get(`/doctors/by-department/${departmentId}`).then(res => setDoctors(res.data));
    }
  }, [departmentId]);

  return (
    <FlatList
      data={doctors}
      keyExtractor={item => item.UserID.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('BookAppointment', { doctorId: item.UserID })}>
          <Text style={{ fontSize: 16 }}>{item.FullName}</Text>
        </TouchableOpacity>
      )}
    />
  );
}