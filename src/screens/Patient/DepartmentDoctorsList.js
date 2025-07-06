import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const DepartmentDoctorsList = () => {
  const [activeTab, setActiveTab] = useState('departments');
  
  const departments = [
    { id: '1', name: 'Khoa Răng Hàm Mặt', description: 'Chuyên điều trị các bệnh về răng, hàm, mặt'},
    { id: '2', name: 'Khoa Thẩm Mỹ', description: 'Các dịch vụ làm đẹp và phẫu thuật thẩm mỹ'},
    { id: '3', name: 'Khoa Tai Mũi Họng', description: 'Chuyên khoa về các bệnh tai mũi họng'},
  ];

  const doctors = [
    { id: '1', name: 'BS. Nguyễn Văn C', specialty: 'Tai Mũi Họng', rating: 4.8},
    { id: '2', name: 'BS. Trần Thị D', specialty: 'Tiêu hóa', rating: 4.5},
    { id: '3', name: 'BS. Lê Văn E', specialty: 'Da liễu', rating: 4.9},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'departments' && styles.activeTab]}
          onPress={() => setActiveTab('departments')}
        >
          <Text style={[styles.tabText, activeTab === 'departments' && styles.activeTabText]}>Danh sách khoa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'doctors' && styles.activeTab]}
          onPress={() => setActiveTab('doctors')}
        >
          <Text style={[styles.tabText, activeTab === 'doctors' && styles.activeTabText]}>Danh sách bác sĩ</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'departments' ? (
        <FlatList
          data={departments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.departmentCard}>
              <Image source={item.image} style={styles.deptImage} />
              <View style={styles.deptInfo}>
                <Text style={styles.deptName}>{item.name}</Text>
                <Text style={styles.deptDesc}>{item.description}</Text>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.doctorCard}>
              <Image source={item.avatar} style={styles.doctorAvatar} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.viewProfile}>Xem hồ sơ</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2D9CDB',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#616161',
  },
  activeTabText: {
    color: 'white',
  },
  departmentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deptImage: {
    width: 100,
    height: 100,
  },
  deptInfo: {
    flex: 1,
    padding: 15,
  },
  deptName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deptDesc: {
    color: '#616161',
    marginBottom: 10,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  doctorSpecialty: {
    color: '#757575',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 3,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  star: {
    color: '#FFC107',
    fontSize: 16,
    marginRight: 10,
  },
  viewProfile: {
    color: '#2D9CDB',
    fontSize: 12,
  },
});

export default DepartmentDoctorsList;