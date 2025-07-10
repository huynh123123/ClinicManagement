import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getPatientInvoices } from '../../services/invoiceService';
import { AuthContext } from '../../context/AuthContext';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const result = await getPatientInvoices(user.id);
        setInvoices(result.data); // Nếu response là { data: [...] }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải danh sách hóa đơn');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user]);

  const renderInvoiceItem = ({ item }) => (
    <View style={styles.invoiceCard}>
      <View style={styles.invoiceHeader}>
        <Text style={styles.invoiceCode}>HD{item.InvoiceID.toString().padStart(4, '0')}</Text>
        <Text
          style={[
            styles.invoiceStatus,
            item.Status === 'Đã thanh toán' ? styles.paidStatus : styles.unpaidStatus,
          ]}
        >
          {item.Status}
        </Text>
      </View>
      <Text style={styles.invoiceDate}>
        Ngày: {new Date(item.CreatedAt).toLocaleDateString()}
      </Text>
      <Text style={styles.invoiceAmount}>
        Tổng tiền: {item.TotalAmount.toLocaleString()} VND
      </Text>
    </View>
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
      <Text style={styles.title}>Danh sách hóa đơn</Text>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.InvoiceID.toString()}
        renderItem={renderInvoiceItem}
        refreshing={loading}
        onRefresh={async () => {
          setLoading(true);
          try {
            const result = await getPatientInvoices(user.id);
            setInvoices(result.data);
          } catch {
            Alert.alert('Lỗi', 'Không thể tải lại dữ liệu');
          } finally {
            setLoading(false);
          }
        }}
      />
    </View>
  );
};

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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 20,
  },
  invoiceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  invoiceCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  invoiceStatus: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  paidStatus: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
  },
  unpaidStatus: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
  },
  invoiceDate: {
    color: '#616161',
    marginBottom: 5,
  },
  invoiceAmount: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default InvoiceList;
