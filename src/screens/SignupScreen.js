import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import api from '../services/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: '',
    Gender: '',
    DOB: '',
    Address: '',
    InsuranceNumber: '',
  });

  const validateForm = () => {
    const { FullName, Email, Password, Phone } = formData;

    if (!FullName || !Email || !Password || !Phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(Email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return false;
    }

    if (Password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(Phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      console.log('📤 Dữ liệu gửi lên server:', formData);
      await api.post('/auth/register', formData);
      Alert.alert('Thành công', 'Đăng ký thành công!');
      navigation.navigate('Login');
    } catch (error) {
      const message =
        error?.message ||
        error?.error ||
        error?.data?.error ||
        'Đăng ký không thành công';
      Alert.alert('Lỗi', message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={formData.FullName}
          onChangeText={(text) =>
            setFormData({ ...formData, FullName: text })
          }
          placeholder="Họ và tên"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.Email}
          onChangeText={(text) =>
            setFormData({ ...formData, Email: text })
          }
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={formData.Password}
          onChangeText={(text) =>
            setFormData({ ...formData, Password: text })
          }
          secureTextEntry={true}
          placeholder="Mật khẩu"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={formData.Phone}
          onChangeText={(text) =>
            setFormData({ ...formData, Phone: text })
          }
          keyboardType="phone-pad"
          placeholder="Số điện thoại"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Giới tính</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.Gender}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, Gender: itemValue })
            }
          >
            <Picker.Item label="Chọn giới tính" value="" />
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ngày sinh</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>{formData.DOB || 'Chọn ngày sinh'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
                setSelectedDate(date);
                setFormData({ ...formData, DOB: formattedDate });
              }
            }}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          value={formData.Address}
          onChangeText={(text) => setFormData({ ...formData, Address: text })}
          placeholder="Địa chỉ"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Số BHYT (nếu có)</Text>
        <TextInput
          style={styles.input}
          value={formData.InsuranceNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, InsuranceNumber: text })
          }
          placeholder="Số BHYT"
        />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleSignup}>
        <Text style={styles.continueButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2D9CDB',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  pickerContainer: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 5,
  overflow: 'hidden',
  },
});

export default SignupScreen;
