import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function DashboardScreen({ navigation, services = [], doctors = [], articles = [] }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>👋 Good Morning, Mike</Text>
        <Image source={{ uri: '' }} style={styles.avatar} />
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Services</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>
        <View style={styles.servicesContainer}>
          {services.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.serviceBox, { backgroundColor: index % 2 === 0 ? '#efe9ff' : '#f3f1eb' }]}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.doctorCount}>{item.doctors} Doctor Available</Text>
              <View style={styles.circle}><Text>{item.initial}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.title}>Top Doctors</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>
        {doctors.map((doctor, index) => (
          <View key={index} style={styles.doctorCard}>
            <View style={styles.circle}><Text>{doctor.initial}</Text></View>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <TouchableOpacity style={styles.viewBtn}><Text style={{ color: 'white' }}>View</Text></TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Experts Health Tips and Advice</Text>
        {articles.map((a, index) => (
          <View key={index} style={styles.articleBox}>
            <Text style={styles.articleTitle}>{a.title}</Text>
            <Text style={styles.articleText}>{a.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6fd', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 20, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  section: { marginTop: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '600' },
  viewAll: { color: 'red' },
  servicesContainer: { flexDirection: 'row', marginTop: 10 },
  serviceBox: { flex: 1, padding: 16, borderRadius: 12, marginRight: 10 },
  serviceName: { fontWeight: 'bold' },
  doctorCount: { color: 'gray', marginVertical: 6 },
  circle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  doctorCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginTop: 10, borderRadius: 12 },
  doctorName: { flex: 1, marginLeft: 10 },
  viewBtn: { backgroundColor: '#4a90e2', padding: 8, borderRadius: 8 },
  articleBox: { backgroundColor: '#fff', padding: 16, marginTop: 10, borderRadius: 12 },
  articleTitle: { fontWeight: 'bold' },
  articleText: { marginTop: 4 }
});
