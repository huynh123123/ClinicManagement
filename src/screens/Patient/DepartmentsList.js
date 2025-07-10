import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../services/api';

const DepartmentsList = ({ navigation }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await api.get('/departments'); // KHÔNG cần baseURL đầy đủ
        setDepartments(result.data || []); // Vì interceptor đã trả response.data rồi
      } catch (error) {
        Alert.alert('Lỗi', error.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const renderDepartmentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.departmentCard}
      onPress={() =>
        navigation.navigate('DepartmentDetail', { departmentId: item.ID })
      }
    >
      <Image
        source={require('../../assets/default-department.png')}
        style={styles.deptImage}
      />
      <View style={styles.deptInfo}>
        <Text style={styles.deptName}>{item.Name}</Text>
        <Text style={styles.deptDesc}>{item.Description}</Text>
        {/* <Text style={styles.viewDetailsText}>Xem chi tiết</Text> */}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={departments}
        keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())}
        renderItem={renderDepartmentItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DepartmentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deptImage: {
    width: 100,
    height: 100,
  },
  deptInfo: {
    flex: 1,
    padding: 15,
  },
  deptName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deptDesc: {
    color: '#616161',
    marginBottom: 10,
  },
  viewDetailsText: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
});
