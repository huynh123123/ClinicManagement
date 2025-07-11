import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderTitleContext } from '../../Layout/DoctorLayout';
import { fetchRequestsByDoctorId } from '../../../../Api/Doctor/RequestApi';
import { useAuth } from '../../../../context/AuthContext';
import { RejectRequestService, AcceptRequestService } from '../../../../services/Doctor/RequestService';

const Request = ({ navigation }) => {
    const { user } = useAuth();
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const [_data, set_Data] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetchRequestsByDoctorId(user.id);
            set_Data(response);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleRejectRequest = (requestId) => {
        const reject = () => {
            if (RejectRequestService(requestId)) {
                fetchData();
            }
        };

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn từ chối yêu cầu này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: reject,
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    }

    const handleAcceptRequest = (requestId) => {
        const accept = () => {
            if (AcceptRequestService(requestId)) {
                fetchData();
            }
        };

        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn đồng ý yêu cầu này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: accept,
                    style: 'default',
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNavigation = () => {
        navigation.navigate('Main');
        setHeaderTitle(null);
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.cardRow}>
            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
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

                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="event" size={16} color="#1976d2" />
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoText}>
                                            {item.date ? new Date(item.date).toLocaleDateString('en-CA') : ''}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="event" size={16} color="#ffb300" />
                                    <Text style={[styles.infoText, { color: '#ffb300' }]}>{item.shift}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAcceptRequest(item.id)}>
                    <MaterialIcons name="check-circle" size={20} color="#43a047" />
                    <Text style={styles.acceptText}>Đồng ý</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => handleRejectRequest(item.id)}>
                    <MaterialIcons name="cancel" size={20} color="#e53935" />
                    <Text style={styles.rejectText}>Từ Chối</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => handleNavigation()}
                activeOpacity={0.7}
            >
                <MaterialIcons name="arrow-back-ios" size={22} color="#1976d2" />
                <Text style={styles.backText}>Chung</Text>
            </TouchableOpacity>
            {_data.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#888', fontSize: 16 }}>Không có yêu cầu nào</Text>
                </View>
            ) : (
                <FlatList
                    data={_data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        position: 'absolute',
        width: 120,
        top: 5,
        left: 16,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    backText: {
        color: '#1976d2',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 2,
        letterSpacing: 0.2,
    },
    list: {
        paddingTop: 56,
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
        alignItems: 'center',
    },
    cardContent: {
        flex: 1.2,
        justifyContent: 'center',
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
    rejectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff4f4',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 18,
        shadowColor: '#e53935',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 1,
        minWidth: 110,
        justifyContent: 'center',
        width: 120
    },
    rejectText: {
        color: '#e53935',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 15,
        letterSpacing: 0.2,
    },
});

export default Request;