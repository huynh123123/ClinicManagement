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
  Alert,
} from 'react-native';
import { getAllDoctors } from '../../services/doctorService';

const DoctorExamination = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
        if (isMounted) {
          setDoctors(res.data || []);
        }
      } catch (err) {
        if (isMounted) {
          Alert.alert('Lỗi', 'Không thể tải danh sách bác sĩ');
        }
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchDoctors();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDoctors = (doctors || []).filter((doc) =>
    doc.FullName.toLowerCase().includes(searchText.toLowerCase()) ||
    doc.SpecialtyName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={require('../../assets/default-avatar.png')}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.FullName}</Text>
        <Text style={styles.specialty}>{item.SpecialtyName || 'Chưa rõ chuyên khoa'}</Text>
        <Text style={styles.room}>Phòng: {item.RoomName || 'Không xác định'}</Text>
        <Text style={styles.department}>Khoa: {item.DepartmentName || 'Không xác định'}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('Booking', { doctor: item })}
      >
        <Text style={styles.bookText}>Đặt lịch</Text>
      </TouchableOpacity>
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
    <View style={styles.container}>
      <Text style={styles.title}>Khám Theo Bác Sĩ</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm bác sĩ theo tên hoặc chuyên khoa..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.UserID.toString()}
        renderItem={renderDoctor}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default DoctorExamination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  specialty: {
    color: '#555',
    marginBottom: 2,
  },
  room: {
    color: '#888',
    fontSize: 12,
  },
  department: {
    color: '#888',
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'center',
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
