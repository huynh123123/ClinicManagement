import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const screenWidth = Dimensions.get('window').width;

const CustomDrawer = ({ navigation, onClose }) => {
  const { signOut } = useContext(AuthContext);
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  // Cập nhật menuItems để khớp với tên màn hình trong Stack Navigator
  const menuItems = [
    { label: 'Trang chủ', screen: 'Home' },
    { label: 'Quản lý hồ sơ bệnh án', screen: 'MedicalRecords' },
    { label: 'Lịch sử đã khám bệnh', screen: 'MedicalHistory' },
    { label: 'Khám theo chuyên khoa', screen: 'SpecialtyExamination' },
    { label: 'Khám theo bác sĩ', screen: 'DoctorExamination' },
    { label: 'Đặt lịch khám', screen: 'Booking' },
    { label: 'Xem danh sách khoa và bác sĩ', screen: 'DepartmentDoctorsList' },
    { label: 'Xem lịch đã hẹn', screen: 'AppointmentList' },
    { label: 'Hóa đơn', screen: 'InvoiceList' },
  ];

  const navigateTo = (screen) => {
    navigation.navigate(screen);
    handleClose();
  };

  return (
    <Animated.View 
      style={[
        styles.drawer, 
        { 
          transform: [{ translateX: slideAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }
      ]}
    >
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeText}>✖ Đóng</Text>
      </TouchableOpacity>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => navigateTo(item.screen)}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        onPress={() => {
          signOut();
          handleClose();
        }} 
        style={styles.logoutButton}
      >
        <Icon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

    </Animated.View>
  );
};

// Giữ nguyên styles
const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    zIndex: 100,
    elevation: 20,
  },
  closeButton: {
    padding: 15,
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3b30',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CustomDrawer;