import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';

const specialties = [
  { id: '1', name: 'Khoa Răng Hàm Mặt' },
  { id: '2', name: 'Khoa Thẩm Mỹ' },
  { id: '3', name: 'Khoa Tai Mũi Họng' },
  { id: '4', name: 'Khoa Tiêu Hóa' },
  { id: '5', name: 'Khoa Da Liễu'},
];

const SpecialtyExamination = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const filteredSpecialties = specialties.filter(spec => 
    spec.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Khám Theo Chuyên Khoa</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm chuyên khoa..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredSpecialties}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Booking', { specialty: item.name })}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.cardText}>{item.name}</Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Đặt lịch</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '48%',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default SpecialtyExamination;