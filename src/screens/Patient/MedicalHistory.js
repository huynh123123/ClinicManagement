import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MedicalHistory = () => {
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  
  const historyData = [
    { id: '1', date: '15/07/2024', doctor: 'BS. Nguyễn Văn C', department: 'Tai Mũi Họng', diagnosis: 'Viêm họng cấp' },
    { id: '2', date: '10/07/2024', doctor: 'BS. Trần Thị D', department: 'Tiêu hóa', diagnosis: 'Đau dạ dày' },
    { id: '3', date: '05/06/2024', doctor: 'BS. Lê Văn E', department: 'Da liễu', diagnosis: 'Viêm da cơ địa' },
  ];

  const filteredData = historyData.filter(item => {
    if (filterMonth === 'all' && filterYear === 'all') return true;
    
    const [day, month, year] = item.date.split('/');
    return (filterMonth === 'all' || month === filterMonth) && 
           (filterYear === 'all' || year === filterYear);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Sử Khám Bệnh</Text>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Tháng:</Text>
          <Picker
            selectedValue={filterMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setFilterMonth(itemValue)}>
            <Picker.Item label="Tất cả" value="all" />
            <Picker.Item label="Tháng 1" value="01" />
            <Picker.Item label="Tháng 2" value="02" />
            {/* Add more months as needed */}
            <Picker.Item label="Tháng 7" value="07" />
          </Picker>
        </View>
        
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Năm:</Text>
          <Picker
            selectedValue={filterYear}
            style={styles.picker}
            onValueChange={(itemValue) => setFilterYear(itemValue)}>
            <Picker.Item label="Tất cả" value="all" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardDoctor}>{item.doctor}</Text>
            <Text style={styles.cardDepartment}>{item.department}</Text>
            <Text style={styles.cardDiagnosis}>Chẩn đoán: {item.diagnosis}</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    marginBottom: 5,
    color: '#616161',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 5,
  },
  cardDoctor: {
    fontSize: 16,
    marginBottom: 3,
  },
  cardDepartment: {
    color: '#757575',
    marginBottom: 5,
  },
  cardDiagnosis: {
    fontStyle: 'italic',
    color: '#616161',
  },
  detailButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  detailButtonText: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
});

export default MedicalHistory;