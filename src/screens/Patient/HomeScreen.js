import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllSpecialties } from '../../services/specialtyService';
import { getFeaturedDoctors } from '../../services/doctorService';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const loadData = async () => {
    try {
      const [specRes, docRes] = await Promise.all([
        getAllSpecialties(),
        getFeaturedDoctors(),
      ]);
      setSpecialties(specRes.data || []);
      setDoctors(docRes.data || []);
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>Chào mừng {user?.FullName || 'bạn'} 👋</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AppointmentList')}
      >
        <Text style={styles.buttonText}>📅 Xem lịch hẹn của tôi</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Chuyên khoa nổi bật</Text>
      <FlatList
        data={specialties}
        keyExtractor={(item) => item.SpecialtyID.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.specialtyCard}
            onPress={() =>
              navigation.navigate('DoctorBySpecialty', { specialty: item })
            }
          >
            <Image
              source={require('../../assets/default-department.png')}
              style={styles.icon}
            />
            <Text style={styles.specialtyName}>{item.Name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noData}>Không có chuyên khoa</Text>
        }
      />

      <Text style={styles.sectionTitle}>Bác sĩ tiêu biểu</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={doctors}
      keyExtractor={(item) => item.UserID.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.doctorCard}
          onPress={() =>
            navigation.navigate('Booking', {
              doctor: {
                id: item.UserID,
                FullName: item.FullName,
                SpecialtyName: item.SpecialtyName,
              },
            })
          }
        >
          <Image
            source={require('../../assets/default-department.png')}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>{item.FullName}</Text>
            <Text style={styles.doctorSpecialty}>
              {item.SpecialtyName || 'Không xác định'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles.noData}>Không có bác sĩ nổi bật</Text>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2D9CDB', marginBottom: 15 },
  button: {
    backgroundColor: '#2D9CDB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  specialtyCard: {
    marginRight: 15,
    alignItems: 'center',
    paddingBottom: 5,
  },
  icon: { width: 60, height: 60, marginBottom: 5 },
  specialtyName: { textAlign: 'center', fontWeight: '500' },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  doctorName: { fontWeight: 'bold', fontSize: 16 },
  doctorSpecialty: { color: '#666' },
  noData: { textAlign: 'center', color: '#aaa', marginVertical: 20 },
});
