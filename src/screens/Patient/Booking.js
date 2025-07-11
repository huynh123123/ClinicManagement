import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import TimeSlotPicker from './TimeSlotPicker';
import { bookAppointment, getAvailableSchedules } from '../../services/appointmentService';
import { AuthContext } from '../../context/AuthContext';

const Booking = ({ route, navigation }) => {
  const { specialty, doctor } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingFor, setBookingFor] = useState('');
  const [reason, setReason] = useState('');

  const { user, token } = useContext(AuthContext);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setSelectedScheduleId(null);

    if (!doctor?.id) {
      return Alert.alert('Lỗi', 'Thiếu thông tin bác sĩ');
    }

    try {
      const slots = await getAvailableSchedules(doctor.id, date, token);
      setAvailableSlots(slots || []);
    } catch (error) {
            console.log('📤 Dữ liệu đặt lịch gửi lên:', doctor.id, date, token);

      Alert.alert('Lỗi', 'Không thể tải lịch khả dụng');
    }
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot.time);
    setSelectedScheduleId(slot.scheduleId);
  };

  const confirmBooking = async () => {
    if (!selectedScheduleId || !bookingFor || !reason) {
      return Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
    }

    try {
      setLoading(true);

      const appointmentData = {
        PatientId: user.id,
        scheduleId: selectedScheduleId,
        bookingFor: bookingFor,
        reason: reason,
      };

      console.log('📤 Dữ liệu đặt lịch gửi lên:', appointmentData);
      await bookAppointment(appointmentData, token);

      Alert.alert('Thành công', 'Đặt lịch thành công!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', error?.message || 'Đặt lịch không thành công');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <Text style={styles.title}>Đặt Lịch Khám</Text>

        {doctor && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Bác sĩ:</Text>
            <Text style={styles.value}>{doctor.FullName}</Text>
          </View>
        )}

        {specialty && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Chuyên khoa:</Text>
            <Text style={styles.value}>{specialty.Name}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Chọn ngày khám</Text>
        <Calendar
          style={styles.calendar}
          onDayPress={(day) => handleDateSelect(day.dateString)}
          markedDates={
            selectedDate
              ? { [selectedDate]: { selected: true, marked: true } }
              : {}
          }
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
              availableSlots={availableSlots}
              onSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          </>
        )}

        {selectedTime && (
          <>
            <Text style={styles.sectionTitle}>Thông tin đặt lịch</Text>
            <TextInput
              style={styles.input}
              placeholder="Người được khám"
              value={bookingFor}
              onChangeText={setBookingFor}
            />
            <TextInput
              style={styles.input}
              placeholder="Lý do khám"
              value={reason}
              onChangeText={setReason}
              multiline
            />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmBooking}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.confirmButtonText}>Hoàn tất đặt lịch</Text>
              )}
            </TouchableOpacity>
          </>
        )}
    </KeyboardAvoidingView>
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
    marginBottom: 10,
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
  input: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Booking;
