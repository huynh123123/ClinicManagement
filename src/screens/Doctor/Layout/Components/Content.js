import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigator from './Navigator';

const items = [
    { name: 'clipboard-check-multiple-outline', label: 'Yêu cầu', iconSet: 'MaterialCommunityIcons' },
    { name: 'calendar-month', label: 'lịch Hẹn', iconSet: 'MaterialIcons' },
    { name: 'user-injured', label: 'Bệnh nhân', iconSet: 'FontAwesome6' },
    { name: 'history', label: 'Lịch sử ', iconSet: 'MaterialIcons' },
];

const HEADER_HEIGHT = 120;

const Content = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <View style={styles.contentWrapper}>
                    <Navigator />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#165461',
    },
    contentBox: {
        flex: 1,
        backgroundColor: '#f6f8fa',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: HEADER_HEIGHT,
        overflow: 'hidden',
    },
    contentWrapper: {
        backgroundColor: '#f6f8fa',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 16,
        flexGrow: 1
    }
});

export default Content;