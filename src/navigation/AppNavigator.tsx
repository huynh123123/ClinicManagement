// // navigation/AppNavigator.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { useAuth } from '../contexts/AuthContext';
// import AuthStack from './AuthStack';
// import PatientStack from './PatientStack';
// import DoctorStack from './DoctorStack';
// import AdminStack from './AdminStack';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   const { user } = useAuth();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {!user ? (
//           <Stack.Screen name="Auth" component={AuthStack} />
//         ) : user.role === 'Patient' ? (
//           <Stack.Screen name="Patient" component={PatientStack} />
//         ) : user.role === 'Doctor' ? (
//           <Stack.Screen name="Doctor" component={DoctorStack} />
//         ) : (
//           <Stack.Screen name="Admin" component={AdminStack} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }