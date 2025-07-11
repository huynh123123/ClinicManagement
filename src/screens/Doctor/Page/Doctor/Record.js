import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { fetchRecordByAppointmentId } from "../../../../Api/Doctor/RecordApi";

const Record = ({ appointmentId, modalVisible, setModalVisible }) => {
    const [record, setRecord] = useState(null);

    const fetchRecord = async () => {
        try {
            const response = await fetchRecordByAppointmentId(appointmentId);
            setRecord(response || {});
        } catch (error) {
            console.error("Error fetching record:", error);
            setRecord({});
        }
    };

    useEffect(() => {
        if (appointmentId && modalVisible) {
            fetchRecord();
        }
    }, [appointmentId, modalVisible]);

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Chi tiết hồ sơ khám bệnh</Text>
                    {record ? (
                        <>
                            <View style={styles.section}>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Tên bệnh nhân:</Text>
                                    <Text style={styles.modalValue}>{record.fullName}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Số điện thoại:</Text>
                                    <Text style={styles.modalValue}>{record.phone}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Ngày khám:</Text>
                                    <Text style={styles.modalValue}>
                                        {record.workDate ? new Date(record.workDate).toLocaleDateString('en-CA') : '-'}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Ca khám:</Text>
                                    <Text style={styles.modalValue}>{record.shift }</Text>
                                </View>
                                  <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Thời gian:</Text>
                                    <Text style={styles.modalValue}>{record.startTime} {'-'} {record.endTime}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Chuyên khoa:</Text>
                                    <Text style={styles.modalValue}>{record.specialties}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Lý do khám:</Text>
                                    <Text style={styles.modalValue}>{record.reason}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.modalLabel}>Trạng thái:</Text>
                                    <Text style={styles.modalValue}>{record.status }</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.diagnosisSection}>
                                <Text style={styles.diagnosisTitle}>Chẩn đoán & Đơn thuốc:</Text>
                                {Array.isArray(record.diagnosis) ? (
                                    record.diagnosis.map((item, idx) => (
                                        <View key={item.recordId ?? idx} style={styles.diagnosisItem}>
                                            <Text style={styles.diagnosisName}>
                                                {idx + 1}. {item.diagnosis}
                                            </Text>
                                            <Text style={styles.diagnosisPrescription}>
                                                Phương pháp: {item.prescription }
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.modalValue}>Không có dữ liệu chẩn đoán</Text>
                                )}
                            </View>
                        </>
                    ) : (
                        <Text>Không có dữ liệu</Text>
                    )}
                    <Pressable style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeBtnText}>Đóng</Text>
                    </Pressable>
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
    section: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    modalLabel: {
        fontWeight: 'bold',
        color: '#1976d2',
        fontSize: 15,
        flex: 1,
        marginTop: 8,
    },
    modalValue: {
        color: '#222',
        fontSize: 15,
        flex: 1,
        marginLeft: 4,
        marginBottom: 2,
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
        borderRadius: 1,
    },
    diagnosisSection: {
        backgroundColor: '#f5faff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    diagnosisTitle: {
        fontWeight: 'bold',
        color: '#1565c0',
        marginBottom: 8,
        fontSize: 16,
    },
    diagnosisItem: {
        marginBottom: 10,
        paddingLeft: 4,
    },
    diagnosisName: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 15.5,
        marginBottom: 2,
    },
    diagnosisPrescription: {
        color: '#444',
        fontSize: 14.5,
        marginLeft: 8,
    },
    closeBtn: {
        marginTop: 18,
        backgroundColor: '#1976d2',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
    },
    closeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});

export default Record;
