import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const InvoiceList = () => {
  const invoices = [
    { id: '1', code: 'HD-2024-001', date: '15/07/2024', amount: '1,500,000 VND', status: 'paid' },
    { id: '2', code: 'HD-2024-002', date: '10/07/2024', amount: '2,300,000 VND', status: 'paid' },
    { id: '3', code: 'HD-2024-003', date: '05/07/2024', amount: '3,750,000 VND', status: 'unpaid' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hóa Đơn</Text>
      
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.invoiceCard}>
            <View style={styles.invoiceHeader}>
              <Text style={styles.invoiceCode}>{item.code}</Text>
              <Text style={[
                styles.invoiceStatus,
                item.status === 'paid' ? styles.paidStatus : styles.unpaidStatus
              ]}>
                {item.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </Text>
            </View>
            <Text style={styles.invoiceDate}>Ngày: {item.date}</Text>
            <Text style={styles.invoiceAmount}>Tổng tiền: {item.amount}</Text>
            
            {item.status === 'unpaid' && (
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Thanh toán</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
  payButton: {
    backgroundColor: '#2D9CDB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  downloadButton: {
    borderWidth: 1,
    borderColor: '#2D9CDB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
});

export default InvoiceList;