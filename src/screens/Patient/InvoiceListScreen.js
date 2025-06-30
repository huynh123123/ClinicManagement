import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../../services/api';

export default function InvoiceListScreen() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/invoices/by-patient/6').then(res => setInvoices(res.data));
  }, []);

  return (
    <FlatList
      data={invoices}
      keyExtractor={item => item.InvoiceID.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 15, borderBottomWidth: 1 }}>
          <Text>Họ tên: {item.BookingFor}</Text>
          <Text>Tổng tiền: {item.TotalAmount} VND</Text>
          <Text>Ngày tạo: {item.CreatedAt}</Text>
        </View>
      )}
    />
  );
}