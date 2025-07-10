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

const SignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: '',
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
          placeholder="Nguyễn Văn A"
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
          placeholder="email@example.com"
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
          placeholder="******"
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
          placeholder="0123456789"
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
});

export default SignupScreen;
