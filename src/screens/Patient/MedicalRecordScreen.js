import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { getPatientRecords } from '../../services/medicalRecordService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const MedicalRecordScreen = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

const fetchRecords = async () => {
  if (!user?.id) {
    Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
    setLoading(false);
    return;
  }

  try {
    const records = await getPatientRecords(user.id);
    setRecords(Array.isArray(records) ? records : []);
  } catch (error) {
    console.error('❌ Error fetching medical records:', error);
    Alert.alert('Lỗi', 'Không thể tải hồ sơ bệnh án');
    setRecords([]);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchRecords();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecords();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('MedicalRecordDetail', { recordId: item.RecordID })
      }
    >
      <Text style={styles.title}>Hồ sơ #{item.RecordID}</Text>
      <Text>Bác sĩ: {item.DoctorName || 'Không rõ'}</Text>
      <Text>
        Ngày tạo:{' '}
        {item.CreatedAt
          ? new Date(item.CreatedAt).toLocaleDateString()
          : 'Không rõ'}
      </Text>
      <Text>Chẩn đoán: {item.Diagnosis || 'Không có'}</Text>
      <Text>Thuốc: {item.Medications || 'Không có'}</Text>
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
      <Text style={styles.header}>Hồ sơ bệnh án của bạn</Text>
      {records.length === 0 ? (
        <Text style={styles.noData}>Không có hồ sơ bệnh án</Text>
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item) => item.RecordID.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default MedicalRecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
