import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { getDoctorsBySpecialty } from '../../services/specialtyService';

const DoctorBySpecialty = ({ route, navigation }) => {
  const { specialty } = route.params;
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctorsBySpecialty(specialty.SpecialtyID);
        setDoctors(response.data || []);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải danh sách bác sĩ');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Booking', {
          doctor: {
            id: item.doctor_id,
            FullName: item.full_name,
            SpecialtyName: item.specialty_name
          },
          specialty: specialty.Name
        })
      }
    >
      <Image
        source={{ uri: item.AvatarURL || 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.full_name}</Text>
        <Text style={styles.specialty}>{item.specialty_name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bác sĩ chuyên khoa: {specialty.Name}</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item, index) =>
          item.doctor_id?.toString() || index.toString()
        }
        renderItem={renderDoctor}
      />
    </View>
  );
};

export default DoctorBySpecialty;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D9CDB'
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  specialty: { color: '#666', marginTop: 4 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
