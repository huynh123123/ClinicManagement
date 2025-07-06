import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const AppointmentList = () => {
  const appointments = [
    { id: '1', date: '2024-07-15', time: '09:00', doctor: 'BS. Nguyễn Văn C', department: 'Tai Mũi Họng', status: 'pending' },
    { id: '2', date: '2024-07-10', time: '14:00', doctor: 'BS. Trần Thị D', department: 'Tiêu hóa', status: 'completed' },
    { id: '3', date: '2024-07-05', time: '10:00', doctor: 'BS. Lê Văn E', department: 'Da liễu', status: 'completed' },
  ];

  const markedDates = {};
  appointments.forEach(app => {
    markedDates[app.date] = { marked: true, dotColor: app.status === 'pending' ? '#2D9CDB' : '#4CAF50' };
  });

  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const completedAppointments = appointments.filter(app => app.status === 'completed');

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentTime}>{item.time}</Text>
        <Text style={[
          styles.appointmentStatus,
          item.status === 'pending' ? styles.pendingStatus : styles.completedStatus
        ]}>
          {item.status === 'pending' ? 'Chờ khám' : 'Đã khám'}
        </Text>
      </View>
      <Text style={styles.appointmentDoctor}>{item.doctor}</Text>
      <Text style={styles.appointmentDepartment}>{item.department}</Text>
      {item.status === 'pending' && (
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Hủy lịch</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Đã Hẹn</Text>
      
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#2D9CDB',
          todayTextColor: '#2D9CDB',
          arrowColor: '#2D9CDB',
        }}
      />

      <Text style={styles.sectionTitle}>Lịch sắp tới</Text>
      {pendingAppointments.length > 0 ? (
        <FlatList
          data={pendingAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentItem}
        />
      ) : (
        <Text style={styles.noAppointments}>Không có lịch hẹn sắp tới</Text>
      )}

      <Text style={styles.sectionTitle}>Lịch đã hoàn thành</Text>
      {completedAppointments.length > 0 ? (
        <FlatList
          data={completedAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentItem}
        />
      ) : (
        <Text style={styles.noAppointments}>Không có lịch đã hoàn thành</Text>
      )}
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
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    color: '#2D9CDB',
  },
  noAppointments: {
    textAlign: 'center',
    color: '#757575',
    marginVertical: 20,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  appointmentStatus: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  pendingStatus: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  completedStatus: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
  },
  appointmentDoctor: {
    fontSize: 16,
    marginBottom: 3,
  },
  appointmentDepartment: {
    color: '#757575',
    marginBottom: 10,
  },
  cancelButton: {
    alignSelf: 'flex-end',
  },
  cancelButtonText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
});

export default AppointmentList;