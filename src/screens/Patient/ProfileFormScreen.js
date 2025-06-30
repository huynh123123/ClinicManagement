import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Button, ScrollView, Alert, TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function ProfileFormScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('Nam');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [nationality, setNationality] = useState('');
  const [insurance, setInsurance] = useState('Có');
  const [job, setJob] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (nationalId.length !== 12) {
      Alert.alert('Lỗi', 'CCCD phải đủ 12 số');
      return;
    }

    Alert.alert('Đã lưu hồ sơ', `Họ tên: ${fullName}`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={setFullName}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>Ngày sinh: {dob.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <View style={styles.pickerContainer}>
        <Text>Giới tính</Text>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Nam" value="Nam" />
          <Picker.Item label="Nữ" value="Nữ" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="CCCD (12 số)"
        keyboardType="number-pad"
        value={nationalId}
        onChangeText={setNationalId}
        maxLength={12}
      />

      <TextInput
        style={styles.input}
        placeholder="Quốc tịch"
        value={nationality}
        onChangeText={setNationality}
      />

      <View style={styles.pickerContainer}>
        <Text>Bảo hiểm y tế</Text>
        <Picker selectedValue={insurance} onValueChange={setInsurance}>
          <Picker.Item label="Có" value="Có" />
          <Picker.Item label="Không" value="Không" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Công việc"
        value={job}
        onChangeText={setJob}
      />

      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Lưu hồ sơ" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden'
  }
});
