import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={userToken ? 'App' : 'Login'}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}