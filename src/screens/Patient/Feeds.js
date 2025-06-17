import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FeedsScreen({ feeds = [] }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>👋 Good Morning, Mike</Text>
      {feeds.map((feed, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.date}>{feed.date}</Text>
          <Text style={styles.title}>{feed.title}</Text>
          <Text>{feed.content}</Text>
          <Text style={styles.author}>By {feed.author}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  date: { color: 'gray', fontSize: 12 },
  title: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
  author: { marginTop: 8, color: 'gray' }
});
