import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { getRecordDetail } from '../../services/medicalRecordService';
import { AuthContext } from '../../context/AuthContext';

const MedicalRecordDetailScreen = ({ route }) => {
  const { recordId } = route.params;
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getRecordDetail(recordId);
        console.log('📄 Hồ sơ:', res); // res chính là data
        setRecord(res); // ✅
      } catch (err) {
        console.error('Lỗi khi tải chi tiết hồ sơ:', err);
        Alert.alert('Lỗi', 'Không thể tải chi tiết hồ sơ');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [recordId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  if (!record) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy hồ sơ</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Chi tiết hồ sơ #{record.RecordID}</Text>

      <View style={styles.item}>
        <Text style={styles.label}>Bác sĩ phụ trách:</Text>
        <Text style={styles.value}>{record.DoctorName}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Ngày tạo:</Text>
        <Text style={styles.value}>{new Date(record.CreatedAt).toLocaleDateString()}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Chẩn đoán:</Text>
        <Text style={styles.value}>{record.Diagnosis}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Triệu chứng:</Text>
        <Text style={styles.value}>{record.Symptoms || 'Không có'}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Ghi chú:</Text>
        <Text style={styles.value}>{record.Notes || 'Không có'}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Thuốc kê đơn:</Text>
        <Text style={styles.value}>{record.Medications || 'Không có'}</Text>
      </View>
    </ScrollView>
  );
};

export default MedicalRecordDetailScreen;

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
  errorText: {
    color: '#888',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D9CDB',
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
    marginTop: 4,
  },
});
