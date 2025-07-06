import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';

const doctors = [
  { 
    id: '1', 
    name: 'BS. Nguyễn Văn C', 
    specialty: 'Tai Mũi Họng', 
    rating: 4.8,
    schedule: ['Mon', 'Wed', 'Fri']
  },
  { 
    id: '2', 
    name: 'BS. Trần Thị D', 
    specialty: 'Tiêu hóa', 
    rating: 4.5,
    schedule: ['Tue', 'Thu', 'Sat']
  },
  { 
    id: '3', 
    name: 'BS. Lê Văn E', 
    specialty: 'Da liễu', 
    rating: 4.9,
    schedule: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
];

const DoctorExamination = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchText.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khám Theo Bác Sĩ</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm bác sĩ theo tên/chuyên khoa..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <Text style={styles.star}>★</Text>
              </View>
              <Text style={styles.schedule}>Lịch làm việc: {item.schedule.join(', ')}</Text>
            </View>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => navigation.navigate('Booking', { doctor: item.name })}
            >
              <Text style={styles.bookButtonText}>Đặt lịch</Text>
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
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  card: {
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
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  specialty: {
    color: '#757575',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginRight: 3,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  star: {
    color: '#FFC107',
    fontSize: 16,
  },
  schedule: {
    fontSize: 12,
    color: '#616161',
  },
  bookButton: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoctorExamination;