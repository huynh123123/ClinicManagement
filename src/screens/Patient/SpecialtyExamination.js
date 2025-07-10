import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getAllSpecialties } from '../../services/specialtyService';

const SpecialtyExamination = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const response = await getAllSpecialties();
        setSpecialties(response.data || []);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải danh sách chuyên khoa');
      } finally {
        setLoading(false);
      }
    };

    loadSpecialties();
  }, []);

  const filteredSpecialties = specialties.filter((spec) =>
    spec.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Chuyên Khoa</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm chuyên khoa..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredSpecialties}
        keyExtractor={(item) => item.SpecialtyID.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DoctorBySpecialty', { specialty: item })
            }
          >
            <Image
              source={require('../../assets/default-department.png')}
              style={styles.icon}
            />
            <Text style={styles.cardText}>{item.Name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SpecialtyExamination;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#2D9CDB' },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '48%',
    padding: 15,
    alignItems: 'center',
    elevation: 3
  },
  icon: { width: 50, height: 50, marginBottom: 10 },
  cardText: { fontWeight: '500', marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
