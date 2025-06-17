import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from './src/screens/Patient/Dashboard';
import AppointmentsScreen from './src/screens/Patient/AppointmentBooking';
import FeedsScreen from './src/screens/Patient/Feeds';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Appointments" component={AppointmentsScreen} />
        <Tab.Screen name="Feeds & Articles" component={FeedsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}