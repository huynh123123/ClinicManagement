import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderTitleContext } from '../../Layout/DoctorLayout';
import { fetchAppointmentsByDoctorIdAndStatus } from '../../../../Api/Doctor/AppointmentApi';
import { finishAppointmentService } from '../../../../services/Doctor/AppointmentService';
import Record from './Record';
import { useAuth } from '../../../../context/AuthContext';

const TABS = [
    { key: 'Đã xác nhận', label: 'Đã xác nhận' },
    { key: 'Hoàn tất', label: 'Hoàn thành' },
    { key: 'Đã hủy', label: 'Đã hủy' },
];

const Appointment = ({ navigation }) => {
    const { user } = useAuth();
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const [selectedTab, setSelectedTab] = useState(TABS[0].key);
    const [modalVisible, setModalVisible] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const [_data, set_Data] = useState([]);

    const fetchData = async (status) => {
        try {
            const response = await fetchAppointmentsByDoctorIdAndStatus(user.id, status);
            set_Data(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFinishAppointment = async (appointmentId) => {
        const finish = async () => {
            if (await finishAppointmentService(appointmentId)) {
                fetchData(selectedTab);
            }
        };

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn đánh dấu lịch hẹn này là đã hoàn thành?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: finish,
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab]);

    const handleNavigation = () => {
        navigation.navigate('Main');
        setHeaderTitle(null);
    };

    const handleRecordModal = (appointmentId) => {
        setAppointmentId(appointmentId);
        setModalVisible(true);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.cardRow}>
            <View style={styles.cardContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={styles.id}>#{index + 1}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.reasonContainer}>
                        <View style={styles.reasonHeader}>
                            <MaterialIcons name="description" size={18} color="#1976d2" />
                            <Text style={styles.reasonLabel}>Lý do khám:</Text>
                        </View>
                        <Text style={styles.reasonText}>{item.reason}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialIcons name="phone" size={16} color="#1976d2" />
                        <Text style={styles.infoText}>{item.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                        <View style={styles.infoItem}>
                            <MaterialIcons name="event" size={16} color="#1976d2" />
                            <Text style={styles.infoText}>
                                {item.date ? new Date(item.date).toLocaleDateString('en-CA') : ''}
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <MaterialIcons name="event" size={16} color="#ffb300" />
                            <Text style={[styles.infoText, { color: '#ffb300' }]}>{item.shift}</Text>
                        </View>
                        {selectedTab === 'Đã xác nhận' ? (
                            <TouchableOpacity style={styles.completedBadge} onPress={() => handleFinishAppointment(item.id)}>
                                <MaterialIcons name="check-circle" size={18} color="#43a047" />
                                <Text style={styles.completedText}>Hoàn thành</Text>
                            </TouchableOpacity>
                        ) : selectedTab === 'Hoàn tất' ? (
                            <TouchableOpacity style={styles.completedBadge} onPress={() => handleRecordModal(item.id)}>
                                <MaterialIcons name="info" size={18} color="#1976d2" />
                                <Text style={[styles.completedText, { color: '#1976d2' }]}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        ) : selectedTab === 'Đã hủy' ? (
                            <View style={[styles.completedBadge, { backgroundColor: '#fdeaea', justifyContent: 'flex-end' }]}>
                                <MaterialIcons name="cancel" size={18} color="#e53935" />
                                <Text style={[styles.completedText, { color: '#e53935' }]}>Đã hủy</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={handleNavigation}
                    activeOpacity={0.7}
                >
                    <View style={styles.backIconWrapper}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="#1976d2" />
                    </View>
                </TouchableOpacity>
                <View style={styles.tabContainer}>
                    {TABS.map(tab => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[
                                styles.tabButton,
                                selectedTab === tab.key && styles.tabButtonActive
                            ]}
                            onPress={() => setSelectedTab(tab.key)}
                        >
                            <Text style={[
                                styles.tabText,
                                selectedTab === tab.key && styles.tabTextActive
                            ]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {_data.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#888', fontSize: 16 }}>Không có lịch hẹn nào</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={_data}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                    <Record
                        appointmentId={appointmentId}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
        borderWidth: 1,
        borderColor: '#e3eefd',
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    backIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    list: {
        paddingTop: 20,
        paddingHorizontal: 12,
        paddingBottom: 24,
    },
    cardRow: {
        flexDirection: 'row',
        backgroundColor: '#f8fbff',
        borderRadius: 18,
        padding: 18,
        marginBottom: 20,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#1976d2',
        alignItems: 'flex-start',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    completedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eafaf1',
        borderRadius: 16,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginTop: 4,
    },
    completedText: {
        color: '#43a047',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 14,
        letterSpacing: 0.2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    id: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 8,
        letterSpacing: 0.2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#222',
        marginRight: 8,
        letterSpacing: 0.2,
    },
    infoBox: {
        alignItems: 'flex-start',
        marginTop: 2,
        gap: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f7fa',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginRight: 8,
    },
    infoText: {
        marginLeft: 5,
        color: '#1976d2',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.1,
    },
    reasonContainer: {
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#1976d2',
        marginBottom: 4,
        width: '100%',
    },
    reasonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    reasonLabel: {
        marginLeft: 6,
        color: '#1976d2',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    reasonText: {
        color: '#333',
        fontSize: 14,
        lineHeight: 20,
        fontStyle: 'italic',
        paddingLeft: 24,
        letterSpacing: 0.1,
    },
    bottomRow: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 10,
    },
    acceptBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eafaf1',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 18,
        marginBottom: 10,
        shadowColor: '#43a047',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 1,
        minWidth: 110,
        justifyContent: 'center',
        width: 120
    },
    acceptText: {
        color: '#43a047',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 15,
        letterSpacing: 0.2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingHorizontal: 8,
        gap: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 0,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 22,
        backgroundColor: '#e3eefd',
        marginRight: 10,
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0,
    },
    tabButtonActive: {
        backgroundColor: '#1976d2',
    },
    tabText: {
        color: '#1976d2',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tabTextActive: {
        color: '#fff',
    },
});

export default Appointment;