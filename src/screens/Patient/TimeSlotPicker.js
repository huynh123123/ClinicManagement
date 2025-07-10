import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const TimeSlotPicker = ({ availableSlots = [], selectedTime, onSelect }) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedTime === item.time;

    return (
      <TouchableOpacity
        style={[styles.slotButton, isSelected && styles.selectedSlot]}
        onPress={() => onSelect(item)}
      >
        <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };

  const formattedSlots = availableSlots.map(slot => ({
    scheduleId: slot.ScheduleID,
    time: `${slot.StartTime.slice(0, 5)} - ${slot.EndTime.slice(0, 5)} (${slot.ShiftName})`
  }));

  if (!formattedSlots.length) {
    return <Text style={styles.noSlotsText}>Không có khung giờ khả dụng</Text>;
  }

  return (
    <FlatList
      data={formattedSlots}
      keyExtractor={(item) => item.scheduleId.toString()}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: 'center',
  },
  slotButton: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#2D9CDB',
  },
  slotText: {
    color: '#333',
    fontSize: 14,
  },
  selectedSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noSlotsText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
});

export default TimeSlotPicker;
