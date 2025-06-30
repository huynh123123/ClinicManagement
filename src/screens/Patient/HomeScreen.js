import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách khoa
    api.get('/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Lỗi load departments:', err));

    // Gọi API lấy bác sĩ trong 1 khoa mặc định (ví dụ khoa ID 1)
    api.get('/doctors/by-department/1')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Lỗi load doctors:', err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>PolyCare</Text>

      <TextInput
        style={styles.search}
        placeholder="Tìm kiếm chuyên ngành"
        placeholderTextColor="#888"
      />

      <View style={styles.buttonRow}>
        <FeatureButton label="Khám chuyên khoa" onPress={() => navigation.navigate('Departments')} />
        <FeatureButton label="Hồ sơ cá nhân" onPress={() => navigation.navigate('ProfileForm')} />
        <FeatureButton label="Khám theo bác sĩ" onPress={() => navigation.navigate('DoctorsByDept')} />
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={() => navigation.navigate('Appointments')}>
        <Text style={styles.scheduleText}>LỊCH HẸN</Text>
      </TouchableOpacity>

      <Section title="Chuyên khoa phổ biến">
        <FlatList
          horizontal
          data={departments}
          keyExtractor={(item) => item.DepartmentID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>{item.Name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      <Section title="Các bác sĩ đang làm việc tại đây">
        <FlatList
          horizontal
          data={doctors}
          keyExtractor={(item) => item.UserID.toString()}
          renderItem={({ item }) => (
            <View style={styles.doctorCard}>
              <Text style={styles.doctorName}>{item.FullName}</Text>
              <Text style={styles.doctorDept}>Khoa ID: {item.DepartmentID}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    </ScrollView>
  );
}

function FeatureButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.featureText}>{label}</Text>
    </TouchableOpacity>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity><Text style={styles.seeMore}>Xem thêm</Text></TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#1e90ff' },
  search: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  featureButton: {
    width: '30%',
    backgroundColor: '#eaf3ff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  featureText: { fontSize: 13, textAlign: 'center', color: '#333' },
  scheduleButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  scheduleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionContainer: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  seeMore: { fontSize: 13, color: '#007bff' },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    marginRight: 10,
    borderRadius: 10,
    width: 140,
    alignItems: 'center'
  },
  cardText: { textAlign: 'center' },
  doctorCard: {
    backgroundColor: '#e6f0ff',
    padding: 14,
    marginRight: 10,
    borderRadius: 10,
    width: 160,
    alignItems: 'center'
  },
  doctorName: { fontWeight: 'bold', fontSize: 14 },
  doctorDept: { fontSize: 12, color: '#444' }
});
