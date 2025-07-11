import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { StyleSheet, View, Text, Image } from 'react-native';

const Header = ({headerTitle}) => {
    const { user } = useAuth();
    
    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                <Text style={styles.headerText}>{headerTitle}</Text>
            </View>
            <View style={styles.rightSection}>
                <View style={styles.userInfo}>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.nameText}>Doctor {user.fullname}</Text>
                </View>
                {/* <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    style={styles.avatar}
                /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: 120,
        backgroundColor: '#165461',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingHorizontal: 16,
    },
    headerText: {
        fontFamily: 'sans-serif-medium',
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    leftSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        borderWidth: 1,
        borderColor: '#165461',
        marginRight: 0,
    },
    userInfo: {
        justifyContent: 'center',
        marginRight: 2
    },
    welcomeText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'sans-serif',
    },
    nameText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        marginTop: 2,
    },
});

export default Header;