import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { HeaderTitleContext } from "../../Layout/DoctorLayout";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchPatientsByDoctorId } from "../../../../Api/Doctor/PatientApi";
import { useAuth } from "../../../../context/AuthContext";

const Patient = ({ navigation }) => {
    const { user } = useAuth();
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const [_data, set_Data] = useState([]);

    const handleNavigationBack = () => {
        navigation.navigate("Main");
        setHeaderTitle(null);
    }

    const fetchPatients = async () => {
        try {
            const response = await fetchPatientsByDoctorId(user.id);
            set_Data(response);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }

    useEffect(() => {
        fetchPatients();
    }, []);

    const renderCard = ({ item, index }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <View style={styles.row}>
                        <Text style={styles.age}>Tuổi: {item.age}</Text>
                        <Text style={[styles.gender, { color: "#3498db" }]}>
                            {item.gender}
                        </Text>
                    </View>
                </View>
                <Text style={styles.id}>#{index + 1}</Text>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Năm Sinh:</Text>
                    <Text style={styles.infoText}>{new Date(item.DOB).toLocaleDateString('en-CA')}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Địa chỉ:</Text>
                    <Text style={styles.infoText}>{item.address}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Số Điện Thoại:</Text>
                    <Text style={styles.infoText}>{item.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{item.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Mã BHYT:</Text>
                    <Text style={styles.infoText}>{item.insuranceNumber}</Text>
                </View>
            </View>
            <View style={styles.footerRow}>
                <Text style={styles.calendar}>📅</Text>
                <Text style={styles.lastBooking}>Lần cuối khám: {new Date(item.lastBooking).toLocaleDateString('en-CA')}</Text>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={handleNavigationBack}
                    activeOpacity={0.7}
                >
                    <View style={styles.backIconWrapper}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="#1976d2" />
                    </View>
                </TouchableOpacity>
            </View>

            {_data.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#888', fontSize: 16 }}>Không có bệnh nhân nào</Text>
                </View>
            ) : (
                <FlatList
                    data={_data}
                    renderItem={renderCard}
                    keyExtractor={(item, idx) => (item.id ? String(item.id) : String(idx))}
                    contentContainerStyle={styles.container}
                />
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#f6f8fa" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginBottom: 22,
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 5,
        borderLeftWidth: 5,
        borderLeftColor: "#3498db",
    },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingHorizontal: 8,
        gap: 0,
    },
    id: {
        color: "#3498db",
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 10
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 2,
        color: "#222"
    },
    row: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    age: {
        color: "#888",
        fontSize: 14,
        marginRight: 10
    },
    gender: {
        fontWeight: "bold",
        fontSize: 14,
    },
    infoBox: {
        backgroundColor: "#f0f4fb",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginVertical: 10,
        alignSelf: "stretch",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        flexWrap: "wrap",
    },
    infoLabel: {
        fontWeight: "bold",
        color: "#2d3436",
        fontSize: 15,
        marginRight: 4,
        flexShrink: 0,
    },
    infoText: {
        color: "#34495e",
        fontSize: 15,
        flex: 1,
        flexWrap: "wrap",
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    lastBooking: {
        color: "#888",
        fontSize: 14,
        marginLeft: 4
    },
    calendar: {
        fontSize: 16,
        marginRight: 2
    },
});

export default Patient;