import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';

const MedicalRecords = () => {
  const [records, setRecords] = useState([
    { id: '1', name: 'Nguyễn Văn A', code: 'BN-001', diagnosis: 'Viêm họng cấp', date: '15/07/2024' },
    { id: '2', name: 'Trần Thị B', code: 'BN-002', diagnosis: 'Đau dạ dày', date: '10/07/2024' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: '',
    code: '',
    symptoms: '',
    history: '',
    diagnosis: '',
    date: new Date().toLocaleDateString(),
  });

  const addRecord = () => {
    setRecords([...records, { ...newRecord, id: Math.random().toString() }]);
    setModalVisible(false);
    setNewRecord({
      name: '',
      code: '',
      symptoms: '',
      history: '',
      diagnosis: '',
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hồ Sơ Bệnh Án</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Thêm hồ sơ</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardCode}>{item.code}</Text>
            </View>
            <Text style={styles.cardText}>Chẩn đoán: {item.diagnosis}</Text>
            <Text style={styles.cardText}>Ngày khám: {item.date}</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailButtonText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm Hồ Sơ Mới</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Tên bệnh nhân"
            value={newRecord.name}
            onChangeText={(text) => setNewRecord({...newRecord, name: text})}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Mã hồ sơ"
            value={newRecord.code}
            onChangeText={(text) => setNewRecord({...newRecord, code: text})}
          />
          
          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder="Triệu chứng"
            multiline
            value={newRecord.symptoms}
            onChangeText={(text) => setNewRecord({...newRecord, symptoms: text})}
          />
          
          <TextInput
            style={[styles.input, {height: 80}]}
            placeholder="Tiền sử bệnh"
            multiline
            value={newRecord.history}
            onChangeText={(text) => setNewRecord({...newRecord, history: text})}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Chẩn đoán"
            value={newRecord.diagnosis}
            onChangeText={(text) => setNewRecord({...newRecord, diagnosis: text})}
          />

          <View style={styles.buttonGroup}>
            <Button title="Hủy" onPress={() => setModalVisible(false)} color="#FF5252" />
            <Button title="Lưu" onPress={addRecord} color="#4CAF50" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D9CDB',
  },
  addButton: {
    backgroundColor: '#2D9CDB',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardCode: {
    color: '#757575',
  },
  cardText: {
    marginBottom: 5,
    color: '#616161',
  },
  detailButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  detailButtonText: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D9CDB',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default MedicalRecords;