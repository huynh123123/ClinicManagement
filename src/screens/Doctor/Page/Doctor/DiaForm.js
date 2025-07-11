import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveDiagnosisService } from '../../../../services/Doctor/DiagService';
import { useAuth } from "../../../../context/AuthContext";

const DiaForm = ({ patientId, appointmentId, modalVisible, setModalVisible, setSelectedTab }) => {
    const [diagnoses, setDiagnoses] = useState([{ diagnosis: '', prescription: '' }]);
    const { user } = useAuth();

    useEffect(() => {
        if (patientId && appointmentId && modalVisible) {
            setDiagnoses([{ diagnosis: '', prescription: '' }]);
        }
    }, [patientId, appointmentId, modalVisible]);

    const addDiagnosis = () => {
        setDiagnoses([...diagnoses, { diagnosis: '', prescription: '' }]);
    };

    const removeDiagnosis = (index) => {
        if (diagnoses.length > 1) {
            const newDiagnoses = diagnoses.filter((_, i) => i !== index);
            setDiagnoses(newDiagnoses);
        }
    };

    const updateDiagnosis = (index, field, value) => {
        const newDiagnoses = diagnoses.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setDiagnoses(newDiagnoses);
    };

    const handleFinishDia = () => {
        const handleSave = async () => {
            const validDiagnoses = diagnoses.filter(item =>
                item.diagnosis.trim() !== '' && item.prescription.trim() !== ''
            );

            if (validDiagnoses.length === 0) {
                Alert.alert('Lỗi', 'Vui lòng nhập ít nhất một chẩn đoán và đơn thuốc');
                return;
            }

            try {
                const diagnosisData = {
                    patientId: patientId,
                    doctorId: user.id,
                    appointmentId: appointmentId,
                    diagnoses: validDiagnoses
                };
                const result = await saveDiagnosisService(diagnosisData);
                if (result.result.success === true) {
                    clearForm();
                    setModalVisible(false);
                    Alert.alert('Thành công', 'Chẩn đoán đã được lưu thành công');
                    setSelectedTab('Hoàn tất');
                }
            } catch (error) {
                setModalVisible(false);
                clearForm();
                console.error('Error saving diagnosis:', error);
                Alert.alert('Lỗi', 'Không thể lưu chẩn đoán. Vui lòng thử lại.');
            }
        };

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn hoàn thành chẩn đoán?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: handleSave,
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const clearForm = () => {
        setDiagnoses([{ diagnosis: '', prescription: '' }]);
    };

    const handleClose = () => {
        const hasUnsavedData = diagnoses.some(item =>
            item.diagnosis.trim() !== '' || item.prescription.trim() !== ''
        );

        if (hasUnsavedData) {
            Alert.alert(
                'Xác nhận',
                'Bạn có muốn đóng form? Dữ liệu chưa lưu sẽ bị mất.',
                [
                    { text: 'Hủy', style: 'cancel' },
                    {
                        text: 'Đóng',
                        onPress: () => {
                            clearForm();
                            setModalVisible(false);
                        }
                    }
                ]
            );
        } else {
            setModalVisible(false);
        }
    };

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Nhập chẩn đoán và đơn thuốc</Text>

                    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        {diagnoses.map((item, index) => (
                            <View key={index} style={styles.diagnosisForm}>
                                <View style={styles.diagnosisHeader}>
                                    <Text style={styles.diagnosisNumber}>Chẩn đoán {index + 1}</Text>
                                    {diagnoses.length > 1 && (
                                        <Pressable
                                            style={styles.removeBtn}
                                            onPress={() => removeDiagnosis(index)}
                                        >
                                            <MaterialIcons name="close" size={20} color="#f44336" />
                                        </Pressable>
                                    )}
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Chẩn đoán:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={item.diagnosis}
                                        onChangeText={(text) => updateDiagnosis(index, 'diagnosis', text)}
                                        placeholder="Nhập chẩn đoán..."
                                        multiline
                                        numberOfLines={3}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Đơn thuốc/Phương pháp:</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={item.prescription}
                                        onChangeText={(text) => updateDiagnosis(index, 'prescription', text)}
                                        placeholder="Nhập đơn thuốc hoặc phương pháp điều trị..."
                                        multiline
                                        numberOfLines={4}
                                    />
                                </View>
                            </View>
                        ))}

                        <Pressable style={styles.addBtn} onPress={addDiagnosis}>
                            <MaterialIcons name="add" size={20} color="#1976d2" />
                            <Text style={styles.addBtnText}>Thêm chẩn đoán</Text>
                        </Pressable>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <Pressable style={[styles.actionBtn, styles.cancelBtn]} onPress={handleClose}>
                            <Text style={styles.cancelBtnText}>Hủy</Text>
                        </Pressable>
                        <Pressable style={[styles.actionBtn, styles.saveBtn]} onPress={handleFinishDia}>
                            <Text style={styles.saveBtnText}>Lưu</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 26,
        width: '90%',
        maxHeight: '80%',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    scrollContainer: {
        maxHeight: 400,
    },
    diagnosisForm: {
        backgroundColor: '#f5faff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e3f2fd',
    },
    diagnosisHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    diagnosisNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1565c0',
    },
    removeBtn: {
        padding: 4,
        borderRadius: 12,
        backgroundColor: '#ffebee',
    },
    inputGroup: {
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#1976d2',
        borderStyle: 'dashed',
        marginBottom: 16,
    },
    addBtnText: {
        color: '#1976d2',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    cancelBtn: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    saveBtn: {
        backgroundColor: '#1976d2',
        elevation: 2,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
    },
    cancelBtnText: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});

export default DiaForm;
