import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Clinic Management</Text>
    </View>
);

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        backgroundColor: '#165461',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default Footer;