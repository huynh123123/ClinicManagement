import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderTitleContext } from "../../../Layout/DoctorLayout";
import { useAuth } from "../../../../../context/AuthContext";
import { changePasswordService, checkOldPasswordService } from "../../../../../services/Doctor/ProfileService";

const Password = ({ navigation }) => {
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPasswordVerified, setOldPasswordVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
    }, []);

const verifyOldPassword = async () => {
        if (!oldPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu cũ');
            return;
        }

        setLoading(true);

        try {
            const result = await checkOldPasswordService(user.id, oldPassword);

            if (result && result.ok && result.status === 200) {
                setOldPasswordVerified(true);
                Alert.alert('Thành công', 'Mật khẩu cũ đã được xác nhận');
            } else {
                setOldPasswordVerified(false);
                Alert.alert('Lỗi', 'Mật khẩu cũ không chính xác');
            }
        } catch (error) {
            setOldPasswordVerified(false);
            Alert.alert('Lỗi', 'Xác nhận mật khẩu cũ không thành công. Vui lòng thử lại sau.');
            console.error('Error verifying old password:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateNewPassword = () => {
        if (newPassword.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự');
            return false;
        }
        if (newPassword === oldPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới phải khác mật khẩu cũ');
            return false;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Xác nhận mật khẩu không khớp');
            return false;
        }
        return true;
    };

    const handleChangePassword = () => {
        if (!validateNewPassword()) return;

        setLoading(true);
        try {
            changePasswordService(user.id, newPassword);

            setTimeout(() => {
                Alert.alert(
                    'Thành công',
                    'Đổi mật khẩu thành công',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
                setLoading(false);
            }, 1000);
        } catch (error) {
            setLoading(false);
            Alert.alert('Lỗi', 'Đổi mật khẩu không thành công. Vui lòng thử lại sau.');
            console.error('Error changing password:', error);
        }
    };

    const resetForm = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOldPasswordVerified(false);
        setShowOldPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const handleNavigationBack = () => {
        navigation.navigate("Profile");
        setHeaderTitle("Hồ sơ cá nhân");
    }

    return (
        <View style={styles.container}>
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

            <ScrollView >
                <View style={styles.formContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="lock" size={60} color="#1976d2" />
                    </View>

                    <Text style={styles.title}>Đổi Mật Khẩu</Text>
                    <Text style={styles.subtitle}>
                        Để bảo mật tài khoản, vui lòng nhập mật khẩu cũ trước khi đổi mật khẩu mới
                    </Text>

                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Mật khẩu cũ *</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, oldPasswordVerified && styles.inputSuccess]}
                                placeholder="Nhập mật khẩu cũ"
                                value={oldPassword}
                                onChangeText={(text) => {
                                    setOldPassword(text);
                                    if (oldPasswordVerified) {
                                        setOldPasswordVerified(false);
                                    }
                                }}
                                secureTextEntry={!showOldPassword}
                                editable={!oldPasswordVerified}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowOldPassword(!showOldPassword)}
                            >
                                <MaterialIcons
                                    name={showOldPassword ? "visibility" : "visibility-off"}
                                    size={24}
                                    color="#666"
                                />
                            </TouchableOpacity>
                            {oldPasswordVerified && (
                                <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.checkIcon} />
                            )}
                        </View>

                        {!oldPasswordVerified && (
                            <TouchableOpacity
                                style={styles.verifyButton}
                                onPress={verifyOldPassword}
                                disabled={loading || !oldPassword}
                            >
                                <Text style={styles.verifyButtonText}>
                                    {loading ? 'Đang xác nhận...' : 'Xác nhận'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {oldPasswordVerified && (
                        <>
                            <View style={styles.inputSection}>
                                <Text style={styles.label}>Mật khẩu mới *</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        secureTextEntry={!showNewPassword}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        <MaterialIcons
                                            name={showNewPassword ? "visibility" : "visibility-off"}
                                            size={24}
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.hint}>Mật khẩu phải có ít nhất 6 ký tự</Text>
                            </View>

                            <View style={styles.inputSection}>
                                <Text style={styles.label}>Xác nhận mật khẩu mới *</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập lại mật khẩu mới"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeButton}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <MaterialIcons
                                            name={showConfirmPassword ? "visibility" : "visibility-off"}
                                            size={24}
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleChangePassword}
                                    disabled={loading || !newPassword || !confirmPassword}
                                >
                                    <MaterialIcons name="save" size={20} color="#fff" />
                                    <Text style={styles.saveButtonText}>
                                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={resetForm}
                                >
                                    <MaterialIcons name="refresh" size={20} color="#666" />
                                    <Text style={styles.resetButtonText}>Làm mới</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
    formContainer: {
        padding: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    inputSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        backgroundColor: '#fff',
        paddingRight: 50,
    },
    inputSuccess: {
        borderColor: '#4CAF50',
        backgroundColor: '#f8fff8',
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        padding: 5,
    },
    checkIcon: {
        position: 'absolute',
        right: 50,
    },
    verifyButton: {
        backgroundColor: '#1976d2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    hint: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        fontStyle: 'italic',
    },
    buttonContainer: {
        marginTop: 30,
        gap: 12,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resetButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Password;