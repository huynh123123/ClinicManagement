import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { HeaderTitleContext } from "../../Layout/DoctorLayout";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {
    const { setHeaderTitle } = useContext(HeaderTitleContext);

    const handleNavigationBack = () => {
        navigation.navigate("Main");
        setHeaderTitle(null);
    }

    const handlePersonalInfo = () => {
        navigation.navigate("PerInfor");
        console.log("Navigate to Personal Info");
    }

    const handleSecurity = () => {
        navigation.navigate("Password");
        console.log("Navigate to Security");
    }

    const menuItems = [
        {
            id: 1,
            title: "Thông tin cá nhân",
            subtitle: "Xem và chỉnh sửa thông tin cá nhân",
            icon: "account-circle",
            iconSet: "MaterialIcons",
            onPress: handlePersonalInfo,
            color: "#1976d2"
        },
        {
            id: 2,
            title: "Bảo mật",
            subtitle: "Thay đổi mật khẩu",
            icon: "shield-account",
            iconSet: "MaterialCommunityIcons",
            onPress: handleSecurity,
            color: "#43a047"
        }
    ];

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                ) : (
                    <MaterialIcons name={item.icon} size={28} color={item.color} />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#f6f8fa" }}>
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

            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
        paddingHorizontal: 8,
        gap: 0,
    },
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
    menuItem: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 4,
    },
    menuSubtitle: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
});

export default Profile;