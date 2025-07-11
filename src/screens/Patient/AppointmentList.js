import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getPatientAppointments } from '../../services/appointmentService';
import { AuthContext } from '../../context/AuthContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(token);
        if (response?.data) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error('Lỗi lấy lịch hẹn:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
      <Text style={styles.doctor}>👨‍⚕️ {item.doctorName}</Text>
      <Text style={styles.specialty}>🏥 {item.specialty}</Text>
      <Text style={styles.date}>📅 {new Date(item.date).toLocaleDateString('vi-VN')}</Text>
      <Text style={styles.reason}>📌 Lý do: {item.reason}</Text>
    </View>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Đang chờ':
        return styles.pending;
      case 'Đã xác nhận':
        return styles.confirmed;
      case 'Hoàn tất':
        return styles.done;
      case 'Đã hủy':
        return styles.cancelled;
      default:
        return {};
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {appointments.length === 0 ? (
        <Text style={styles.noData}>Không có lịch hẹn nào</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  confirmed: {
    backgroundColor: '#FFF3E0',
    color: '#FB8C00',
  },
  done: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
  },
  cancelled: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
  },
  doctor: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialty: {
    color: '#757575',
    marginBottom: 4,
  },
  date: {
    marginBottom: 4,
  },
  reason: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
});
