import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import DoctorLayout from './src/screens/Doctor/Layout/DoctorLayout';

const RootStack = createStackNavigator();

const AppContent = () => {
  const { user, userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    userToken && user.role != null && user.role === 'BacSi' ? (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <DoctorLayout />
        </NavigationContainer>
      </SafeAreaView>
    ) : (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {userToken ? (
            <RootStack.Screen name="App" component={AppNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    )
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
