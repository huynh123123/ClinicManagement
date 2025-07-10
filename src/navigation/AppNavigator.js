import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/Patient/HomeScreen';
import MedicalRecordScreen from '../screens/Patient/MedicalRecordScreen';
import MedicalRecordDetailScreen from '../screens/Patient/MedicalRecordDetailScreen';
import SpecialtyExamination from '../screens/Patient/SpecialtyExamination';
import DoctorExamination from '../screens/Patient/DoctorExamination';
import Booking from '../screens/Patient/Booking';
import DepartmentsList from '../screens/Patient/DepartmentsList';
import AppointmentList from '../screens/Patient/AppointmentList';
import InvoiceList from '../screens/Patient/InvoiceList';
import CustomDrawer from '../screens/Patient/CustomDrawer';
import DoctorBySpecialty from '../screens/Patient/DoctorBySpecialty';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2D9CDB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({
          title: 'PolyCare',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()} 
              style={{ marginLeft: 15 }}
            >
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="SpecialtyExamination" 
        component={SpecialtyExamination} 
        options={{ title: 'Chọn Chuyên Khoa' }} 
      />
      <Stack.Screen 
        name="DoctorExamination" 
        component={DoctorExamination} 
        options={{ title: 'Khám Theo Bác Sĩ' }} 
      />
      <Stack.Screen 
        name="Booking" 
        component={Booking} 
        options={{ title: 'Đặt Lịch Khám' }} 
      />
      <Stack.Screen 
        name="DepartmentsList" 
        component={DepartmentsList} 
        options={{ title: 'Danh Sách Chuyên Khoa' }} 
      />
      <Stack.Screen 
        name="AppointmentList" 
        component={AppointmentList} 
        options={{ title: 'Lịch Đã Hẹn' }} 
      />
      <Stack.Screen 
        name="InvoiceList" 
        component={InvoiceList} 
        options={{ title: 'Hóa Đơn' }} 
      />
      <Stack.Screen 
      name="DoctorBySpecialty" 
      component={DoctorBySpecialty} 
      options={{title:'Chọn Bác Sĩ'}}  
      />
      <Stack.Screen name="MedicalRecordDetail" component={MedicalRecordDetailScreen} options={{ title: 'Hồ sơ bệnh án' }} />
      <Stack.Screen name="MedicalRecord" component={MedicalRecordScreen} options={{ title: 'Chi tiết hồ sơ' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: {
          width: '75%',
        },
      }}
      initialRouteName="MainStack"
    >
      <Drawer.Screen 
        name="MainStack" 
        component={MainStack} 
        options={{
          drawerLabel: 'Trang chủ',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;