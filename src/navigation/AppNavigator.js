import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Patient/HomeScreen';
import MedicalRecords from '../screens/Patient/MedicalRecords';
import MedicalHistory from '../screens/Patient/MedicalHistory';
import SpecialtyExamination from '../screens/Patient/SpecialtyExamination';
import DoctorExamination from '../screens/Patient/DoctorExamination';
import Booking from '../screens/Patient/Booking';
import DepartmentDoctorsList from '../screens/Patient/DepartmentDoctorsList';
import AppointmentList from '../screens/Patient/AppointmentList';
import InvoiceList from '../screens/Patient/InvoiceList';
import CustomDrawer from '../screens/Patient/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Tạo Stack Navigator như trước
const MainStack = () => {
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
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'PolyCare' }} />
      <Stack.Screen name="MedicalRecords" component={MedicalRecords} options={{ title: 'Hồ Sơ Bệnh Án' }} />
      <Stack.Screen name="MedicalHistory" component={MedicalHistory} options={{ title: 'Lịch Sử Khám Bệnh' }} />
      <Stack.Screen name="SpecialtyExamination" component={SpecialtyExamination} options={{ title: 'Khám Theo Chuyên Khoa' }} />
      <Stack.Screen name="DoctorExamination" component={DoctorExamination} options={{ title: 'Khám Theo Bác Sĩ' }} />
      <Stack.Screen name="Booking" component={Booking} options={{ title: 'Đặt Lịch Khám' }} />
      <Stack.Screen name="DepartmentDoctorsList" component={DepartmentDoctorsList} options={{ title: 'Danh Sách Khoa & Bác Sĩ' }} />
      <Stack.Screen name="AppointmentList" component={AppointmentList} options={{ title: 'Lịch Đã Hẹn' }} />
      <Stack.Screen name="InvoiceList" component={InvoiceList} options={{ title: 'Hóa Đơn' }} />
    </Stack.Navigator>
  );
};

// Tạo Drawer Navigator bao bọc Stack Navigator
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false, // Ẩn header của Drawer vì Stack đã có header riêng
      }}
    >
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;