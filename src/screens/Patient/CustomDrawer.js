import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../../context/AuthContext';

const CustomDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    { label: 'Trang chủ', icon: 'home', screen: 'Home' },
    { label: 'Hồ sơ bệnh án', icon: 'calendar-today', screen: 'MedicalRecord' },
    { label: 'Đặt lịch khám', icon: 'calendar-today', screen: 'SpecialtyExamination' },
    { label: 'Danh sách khoa', icon: 'list', screen: 'DepartmentsList' },
    { label: 'Lịch hẹn', icon: 'event-note', screen: 'AppointmentList' },
    { label: 'Hóa đơn', icon: 'receipt', screen: 'InvoiceList' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={user?.avatar ? { uri: user.avatar } : require('../../assets/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user?.FullName || 'Khách'}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() => props.navigation.navigate('MainStack', { screen: item.screen })}
            labelStyle={styles.menuItemText}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: -15,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D9CDB',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CustomDrawer;
