import React, { useState, createContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Content from './Components/Content';

export const HeaderTitleContext = createContext({
    headerTitle: null,
    setHeaderTitle: () => { },
});

const DoctorLayout = () => {
    const [headerTitle, setHeaderTitle] = useState("Doctor Dashboard");

    useEffect(() => {
        if (headerTitle === null) {
            setHeaderTitle("Doctor Dashboard");
        }
    }, [headerTitle]);

    return (
        <HeaderTitleContext.Provider value={{ headerTitle, setHeaderTitle }}>
            <View style={styles.container}>
                <Header headerTitle={headerTitle} />
                <Content />
                <Footer />
            </View>
        </HeaderTitleContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
    }
});

export default DoctorLayout;