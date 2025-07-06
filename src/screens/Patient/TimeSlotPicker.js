import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const TimeSlotPicker = ({ selectedDate, bookedSlots, onSelect, selectedTime }) => {
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item}
        numColumns={4}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isBooked = bookedSlots.includes(item);
          const isSelected = selectedTime === item;
          
          return (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                isBooked && styles.bookedSlot,
                isSelected && styles.selectedSlot
              ]}
              onPress={() => !isBooked && onSelect(item)}
              disabled={isBooked}
            >
              <Text style={[
                styles.timeText,
                isBooked && styles.bookedText,
                isSelected && styles.selectedText
              ]}>
                {item}
              </Text>
              {isBooked && <Text style={styles.bookedLabel}>Đã đặt</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeSlot: {
    width: '23%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  timeText: {
    color: '#212121',
  },
  bookedSlot: {
    backgroundColor: '#FFCDD2',
  },
  bookedText: {
    color: '#C62828',
    textDecorationLine: 'line-through',
  },
  bookedLabel: {
    fontSize: 10,
    color: '#C62828',
  },
  selectedSlot: {
    backgroundColor: '#2D9CDB',
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimeSlotPicker;