import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AppointmentBooking({ appointments = [] }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👋 Good Morning, Mike</Text>
      <Text style={styles.heading}>My Appointments</Text>

      <View style={styles.filters}>
        {['All', 'Latest', 'Pending', 'Completed', 'Cancelled'].map(status => (
          <TouchableOpacity key={status} style={styles.filterBtn}>
            <Text>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {appointments.map((appt, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.doctorName}>{appt.doctor}</Text>
          <Text>{appt.description}</Text>
          <Text style={styles.time}>{appt.date} • {appt.time}</Text>
          <TouchableOpacity style={styles.viewBtn}><Text>View</Text></TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '600' },
  heading: { fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  filterBtn: { padding: 8, backgroundColor: '#eee', margin: 4, borderRadius: 6 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  doctorName: { fontWeight: 'bold', marginBottom: 4 },
  time: { color: 'gray', marginVertical: 4 },
  viewBtn: { backgroundColor: '#ddd', padding: 8, borderRadius: 8, alignSelf: 'flex-start' }
});
