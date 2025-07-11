import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../../../context/AuthContext';

const WorkSchedule = ({ navigation }) => {
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [workSchedule, setWorkSchedule] = useState([]);
    const { user } = useAuth();

    const scheduleData = [
        { date: '2025-07-03', shifts: [{ time: '08:00 - 12:00', type: 'Sáng' }, { time: '14:00 - 17:00', type: 'Chiều' }] },
        { date: '2025-07-04', shifts: [{ time: '08:00 - 12:00', type: 'Sáng' }] },
        { date: '2025-07-05', shifts: [{ time: '14:00 - 17:00', type: 'Chiều' }] },
        { date: '2025-07-06', shifts: [] },
    ];

    useEffect(() => {
        const weekDates = getWeekDates(selectedWeek);
        const weekSchedule = weekDates.map(date => {
            const dateString = date.toISOString().split('T')[0];
            return scheduleData.find(s => s.date === dateString) || { date: dateString, shifts: [] };
        });
        setWorkSchedule(weekSchedule);
    }, [selectedWeek]);

    const getWeekDates = (weekOffset = 0) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7));

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
    };

    const formatDate = (date) => `${date.getDate()}/${date.getMonth() + 1}`;

    const getShiftIcon = (type) => {
        switch (type) {
            case 'Sáng': return 'white-balance-sunny';
            case 'Chiều': return 'weather-sunset';
            case 'Tối': return 'weather-night';
            default: return 'clock-outline';
        }
    };

    const getShiftColor = (type) => {
        switch (type) {
            case 'Sáng': return '#FF9800';
            case 'Chiều': return '#FF5722';
            case 'Tối': return '#3F51B5';
            default: return '#4CAF50';
        }
    };

    const renderScheduleItem = ({ item }) => {
        const itemDate = new Date(item.date);
        const dayIndex = (itemDate.getDay() + 6) % 7;
        const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        const isToday = itemDate.toDateString() === new Date().toDateString();

        return (
            <View style={[styles.card, isToday && styles.todayCard]}>
                <View style={styles.header}>
                    <View style={styles.dayInfo}>
                        <Text style={[styles.dayName, isToday && styles.todayText]}>
                            {dayNames[dayIndex]}
                        </Text>
                        <Text style={[styles.date, isToday && styles.todayDateText]}>
                            {formatDate(itemDate)}
                        </Text>
                    </View>
                    {isToday && (
                        <View style={styles.todayBadge}>
                            <MaterialIcons name="today" size={16} color="#fff" />
                            <Text style={styles.todayBadgeText}>Hôm nay</Text>
                        </View>
                    )}
                </View>

                <View style={styles.shiftsContainer}>
                    {item.shifts.length > 0 ? (
                        item.shifts.map((shift, index) => (
                            <View key={index} style={[styles.shift, { borderLeftColor: getShiftColor(shift.type) }]}>
                                <View style={styles.shiftContent}>
                                    <MaterialCommunityIcons 
                                        name={getShiftIcon(shift.type)} 
                                        size={20} 
                                        color={getShiftColor(shift.type)}
                                        style={styles.shiftIcon}
                                    />
                                    <View style={styles.shiftInfo}>
                                        <Text style={styles.shiftType}>{shift.type}</Text>
                                        <Text style={styles.shiftTime}>{shift.time}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.noShift}>
                            <MaterialCommunityIcons name="sleep" size={24} color="#B0BEC5" />
                            <Text style={styles.noShiftText}>Nghỉ ngơi</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    const weekDates = getWeekDates(selectedWeek);
    const weekRange = `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1976d2" />
            
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Main')}
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back-ios" size={24} color="#1976d2" />
                </TouchableOpacity>
                <Text style={styles.title}>Ca Làm Việc</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.weekNav}>
                <TouchableOpacity 
                    onPress={() => setSelectedWeek(selectedWeek - 1)}
                    style={styles.navButton}
                >
                    <MaterialIcons name="chevron-left" size={28} color="#1976d2" />
                </TouchableOpacity>
                
                <View style={styles.weekInfo}>
                    <Text style={styles.weekText}>Tuần {Math.abs(selectedWeek) + 1}</Text>
                    <Text style={styles.weekRange}>{weekRange}</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={() => setSelectedWeek(selectedWeek + 1)}
                    style={styles.navButton}
                >
                    <MaterialIcons name="chevron-right" size={28} color="#1976d2" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={workSchedule}
                renderItem={renderScheduleItem}
                keyExtractor={(item) => item.date}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f8f9fa' 
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
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
    title: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#00000',
        textAlign: 'center'
    },
    headerSpacer: { width: 40 },
    weekNav: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#fff', 
        borderRadius: 16, 
        padding: 20, 
        marginHorizontal: 16,
        marginVertical: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    navButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5'
    },
    weekInfo: { 
        alignItems: 'center' 
    },
    weekText: { 
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#1976d2'
    },
    weekRange: { 
        fontSize: 14, 
        color: '#666', 
        marginTop: 4 
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    card: { 
        backgroundColor: '#fff', 
        borderRadius: 16, 
        padding: 20, 
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    todayCard: { 
        borderWidth: 2, 
        borderColor: '#1976d2',
        elevation: 6,
        shadowColor: '#1976d2',
        shadowOpacity: 0.2
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16 
    },
    dayInfo: { 
        flexDirection: 'row',
        alignItems: 'center'
    },
    dayName: { 
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#333',
        marginRight: 12
    },
    date: { 
        fontSize: 14, 
        color: '#666',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    todayText: { 
        color: '#1976d2' 
    },
    todayDateText: { 
        color: '#1976d2',
        backgroundColor: '#e3f2fd'
    },
    todayBadge: {
        backgroundColor: '#1976d2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todayBadgeText: { 
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4
    },
    shiftsContainer: {
        gap: 12
    },
    shift: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50'
    },
    shiftContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shiftIcon: {
        marginRight: 12
    },
    shiftInfo: {
        flex: 1
    },
    shiftType: { 
        fontSize: 16, 
        fontWeight: 'bold',
        color: '#333'
    },
    shiftTime: { 
        fontSize: 14, 
        color: '#666',
        marginTop: 2
    },
    noShift: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa', 
        borderRadius: 12, 
        padding: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed'
    },
    noShiftText: { 
        fontSize: 16, 
        color: '#B0BEC5', 
        marginLeft: 12,
        fontStyle: 'italic'
    },
});

export default WorkSchedule;