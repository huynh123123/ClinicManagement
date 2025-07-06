import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';

// Dữ liệu mẫu thay thế API
const sampleSpecialties = [
  { SpecialtyID: 1, Name: 'Nội khoa', Description: 'Khám và điều trị bệnh nội khoa' },
  { SpecialtyID: 2, Name: 'Ngoại khoa', Description: 'Phẫu thuật và điều trị ngoại khoa' },
  { SpecialtyID: 3, Name: 'Nhi khoa', Description: 'Chuyên về trẻ em' },
  { SpecialtyID: 4, Name: 'Tai Mũi Họng', Description: 'Khám các bệnh về tai mũi họng' },
  { SpecialtyID: 5, Name: 'Da liễu', Description: 'Chuyên về da và thẩm mỹ' },
];

const sampleDoctors = [
  { UserID: 1, FullName: 'BS. Nguyễn Văn A', SpecialtyName: 'Nội khoa' },
  { UserID: 2, FullName: 'BS. Trần Thị B', SpecialtyName: 'Ngoại khoa' },
  { UserID: 3, FullName: 'BS. Lê Văn C', SpecialtyName: 'Nhi khoa' },
  { UserID: 4, FullName: 'BS. Phạm Thị D', SpecialtyName: 'Tai Mũi Họng' },
  { UserID: 5, FullName: 'BS. Hoàng Văn E', SpecialtyName: 'Da liễu' },
];

const screenWidth = Dimensions.get('window').width;
const itemsPerPage = 3;

const chunkArray = (arr, chunkSize) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const HomeScreen = () => {
  const [specialties] = useState(sampleSpecialties);
  const [doctors] = useState(sampleDoctors);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigation = useNavigation();

  const chunkedSpecialties = chunkArray(specialties, itemsPerPage);
  const displayedSpecialties = chunkedSpecialties[page] || [];

  const nextPage = () => {
    if (page < chunkedSpecialties.length - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const navigateTo = (screen) => {
    setDrawerVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Text style={{ fontSize: 24 }}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>🏥 PolyCare</Text>
          <TouchableOpacity onPress={() => console.log('Thông báo')}>
          </TouchableOpacity>
        </View>

        {/* Button Lịch hẹn */}
        <TouchableOpacity 
          style={styles.appointmentButton}
          onPress={() => navigateTo('AppointmentList')}
        >
          <Text style={styles.appointmentText}>LỊCH HẸN</Text>
        </TouchableOpacity>

        {/* Thanh tìm kiếm */}
        <TextInput
          placeholder="🔍 Tìm chuyên khoa, bác sĩ..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => {
            if (searchTerm.trim() !== '') {
              navigation.navigate('SearchScreen', { keyword: searchTerm });
            }
          }}
          style={styles.searchInput}
        />

        {/* Chuyên khoa phổ biến */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chuyên khoa phổ biến</Text>
          <View style={styles.specialtyRow}>
            <TouchableOpacity onPress={prevPage} style={styles.arrowBox}>
              <Text style={styles.arrowText}>◀︎</Text>
            </TouchableOpacity>

            {displayedSpecialties.map((item) => (
              <TouchableOpacity 
                key={item.SpecialtyID} 
                style={styles.boxGrid}
                onPress={() => navigation.navigate('SpecialtyDetail', { specialty: item })}
              >
                <Text style={styles.specialtyName}>{item.Name}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={nextPage} style={styles.arrowBox}>
              <Text style={styles.arrowText}>▶︎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danh sách bác sĩ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bác sĩ nổi bật</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DoctorList')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {doctors.map((doctor) => (
              <TouchableOpacity 
                key={doctor.UserID} 
                style={styles.doctorBox}
                onPress={() => navigation.navigate('DoctorDetail', { doctor })}
              >
                <Text style={styles.doctorName}>{doctor.FullName}</Text>
                <Text style={styles.specialty}>{doctor.SpecialtyName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Custom Drawer */}
      {drawerVisible && (
        <CustomDrawer
          onClose={() => setDrawerVisible(false)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  appointmentButton: {
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  appointmentText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    elevation: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#2D9CDB',
    fontSize: 14,
  },
  specialtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowBox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 24,
    color: '#2D9CDB',
  },
  boxGrid: {
    backgroundColor: 'white',
    width: (screenWidth - 120) / 3,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  specialtyName: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  doctorBox: {
    backgroundColor: 'white',
    width: 150,
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;