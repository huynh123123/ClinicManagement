import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from './../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Xử lý đăng nhập
    if (username && password) {
      signIn('user-token'); // Thay bằng token thực tế sau khi xác thực
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tên đăng nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên đăng nhập"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.separator} />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Bạn là người mới? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
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
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberText: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
});

export default LoginScreen;