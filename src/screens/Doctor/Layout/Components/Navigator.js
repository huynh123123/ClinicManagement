import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../../Page/Doctor/Main';
import Request from '../../Page/Doctor/Request';
import Appointment from '../../Page/Doctor/Appointment';
import Patient from '../../Page/Doctor/Patient';
import Profile from '../../Page/Doctor/Profile';
import PerInfor from '../../Page/Doctor/ProfileDetail/PerInfor';
import WorkSchedule from '../../Page/Doctor/WorkSchedule';
import Password from '../../Page/Doctor/ProfileDetail/Password';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{
                contentStyle: { backgroundColor: '#f6f8fa' },
                headerShown: false,
                animation: 'fade_from_bottom',
                animationDuration: 200
            }}
        >
            <Stack.Screen
                name="Main"
                component={Main}
            />
            <Stack.Screen
                name="Request"
                component={Request}
            />
            <Stack.Screen
                name="Appointment"
                component={Appointment}
            />
            <Stack.Screen
                name="Patient"
                component={Patient}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
            />
            <Stack.Screen
                name="PerInfor"
                component={PerInfor}
            />
            <Stack.Screen
                name="WorkSchedule"
                component={WorkSchedule}
            />
              <Stack.Screen
                name="Password"
                component={Password}
            />
        </Stack.Navigator>
    );
};

export default Navigator;