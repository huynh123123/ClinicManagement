import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TimeSlotPicker from './TimeSlotPicker';

const Booking = ({ route }) => {
  const { specialty, doctor } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const bookedAppointments = {
    '2024-07-15': ['09:00', '14:00'],
    '2024-07-16': ['10:00', '15:00'],
  };

  const markedDates = {};
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: '#2D9CDB' };
  }
  
  Object.keys(bookedAppointments).forEach(date => {
    markedDates[date] = { marked: true, dotColor: '#FF5252' };
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày và giờ khám');
      return;
    }
    
    Alert.alert(
      'Xác nhận đặt lịch',
      `Bạn đã đặt lịch khám với ${doctor || specialty} vào ngày ${selectedDate} lúc ${selectedTime}`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xác nhận', onPress: () => {
          Alert.alert('Thành công', 'Đặt lịch thành công!');
          // Here you would typically save the appointment to your backend
        }},
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đặt Lịch Khám</Text>
      
      {doctor && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Bác sĩ:</Text>
          <Text style={styles.value}>{doctor}</Text>
        </View>
      )}
      
      {specialty && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Chuyên khoa:</Text>
          <Text style={styles.value}>{specialty}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Chọn ngày khám</Text>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => handleDateSelect(day.dateString)}
        theme={{
          selectedDayBackgroundColor: '#2D9CDB',
          todayTextColor: '#2D9CDB',
          arrowColor: '#2D9CDB',
        }}
      />

      {selectedDate && (
        <>
          <Text style={styles.sectionTitle}>Chọn giờ khám</Text>
          <TimeSlotPicker 
            selectedDate={selectedDate}
            bookedSlots={bookedAppointments[selectedDate] || []}
            onSelect={handleTimeSelect}
            selectedTime={selectedTime}
          />
        </>
      )}

      {selectedTime && (
        <TouchableOpacity style={styles.confirmButton} onPress={confirmBooking}>
          <Text style={styles.confirmButtonText}>Hoàn tất đặt lịch</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
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
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    color: '#616161',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2D9CDB',
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Booking;