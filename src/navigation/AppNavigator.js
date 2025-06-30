import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Patient/HomeScreen';
import DepartmentListScreen from '../screens/Patient/DepartmentListScreen';
import DoctorListScreen from '../screens/Patient/DoctorListScreen';
import AppointmentBookingScreen from '../screens/Patient/AppointmentBookingScreen';
import AppointmentHistoryScreen from '../screens/Patient/AppointmentHistoryScreen';
import InvoiceListScreen from '../screens/Patient/InvoiceListScreen';
import ProfileFormScreen from '../screens/Patient/ProfileFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Departments" component={DepartmentListScreen} options={{ title: 'Danh sách chuyên khoa' }} />
      <Stack.Screen name="DoctorsByDept" component={DoctorListScreen} options={{ title: 'Danh sách bác sĩ' }} />
      <Stack.Screen name="BookAppointment" component={AppointmentBookingScreen} />
      <Stack.Screen name="Appointments" component={AppointmentHistoryScreen} />
      <Stack.Screen name="Invoices" component={InvoiceListScreen} />
      <Stack.Screen name="ProfileForm" component={ProfileFormScreen} options={{ title: 'Hồ sơ cá nhân' }} />
    </Stack.Navigator>
  );
}
