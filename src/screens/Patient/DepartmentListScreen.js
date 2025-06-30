import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../../services/api';

export default function DepartmentListScreen({ navigation }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/departments').then(res => setDepartments(res.data));
  }, []);

  return (
    <FlatList
      data={departments}
      keyExtractor={item => item.DepartmentID.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ padding: 15 }} onPress={() => navigation.navigate('DoctorsByDept', { departmentId: item.DepartmentID })}>
          <Text style={{ fontSize: 16 }}>{item.Name}</Text>
          <Text style={{ color: '#888' }}>{item.Description}</Text>
        </TouchableOpacity>
      )}
    />
  );
}