import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { HeaderTitleContext } from '../../Layout/DoctorLayout';
import { useAuth } from '../../../../context/AuthContext';

const items = [
    { name: 'clipboard-check-multiple-outline', label: 'Yêu cầu', iconSet: 'MaterialCommunityIcons', route: 'Request', title: 'Yêu Cầu Khám' },
    { name: 'calendar-month', label: 'lịch Hẹn', iconSet: 'MaterialIcons', route: 'Appointment', title: 'Lịch Hẹn Khám' },
    { name: 'user-injured', label: 'Bệnh nhân', iconSet: 'FontAwesome6', route: 'Patient', title: 'Danh Sách Bệnh Nhân' },
    { name: 'folder-account', label: 'Hồ sơ cá nhân', iconSet: 'MaterialCommunityIcons', route: 'Profile', title: 'Hồ sơ cá nhân' },
    { name: 'calendar-clock', label: 'Lịch làm việc', iconSet: 'MaterialCommunityIcons', route: 'WorkSchedule', title: 'Lịch Làm Việc' },
    { name: 'logout', label: 'Đăng xuất', iconSet: 'MaterialIcons', route: 'Logout', title: 'Đăng Xuất' },
];


const ICON_COLOR = '#1976d2';

const Main = ({ navigation }) => {
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const { logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Xác nhận đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    onPress: logout,
                    style: 'destructive',
                },
            ]
        );
    };

    const handleNavigation = (item) => {
        if (item.route === 'Logout') {
            handleLogout();
        } else {
            setHeaderTitle(item.title);
            navigation.navigate(item.route);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.iconItem}
            activeOpacity={0.85}
            onPress={() => handleNavigation(item)}
        >
            <View style={styles.iconCircle}>
                {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons name={item.name} size={38} color={ICON_COLOR} />
                ) : item.iconSet === 'FontAwesome6' ? (
                    <FontAwesome6 name={item.name} size={38} color={ICON_COLOR} />
                ) : (
                    <MaterialIcons name={item.name} size={38} color={ICON_COLOR} />
                )}
            </View>
            <Text style={styles.iconLabel}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={2}
            contentContainerStyle={styles.iconGrid}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    iconGrid: {
        paddingHorizontal: 10,
        marginTop: 10,
        paddingBottom: 20,
    },
    iconItem: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 18,
        backgroundColor: '#fff',
        paddingVertical: 28,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#e3e8ee',
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        marginHorizontal: 5,
    },
    iconCircle: {
        backgroundColor: '#e3f2fd',
        borderRadius: 50,
        padding: 16,
        marginBottom: 10,
    },
    iconLabel: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1976d2',
        marginTop: 2,
        letterSpacing: 0.2,
    },
});

export default Main;