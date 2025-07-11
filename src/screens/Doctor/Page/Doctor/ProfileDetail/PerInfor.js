import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { HeaderTitleContext } from "../../../Layout/DoctorLayout";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchDoctorInfor } from "../../../../../Api/Doctor/ProfileApi";
import DatePicker from 'react-native-date-picker';
import { useAuth } from "../../../../../context/AuthContext";
import { updateDoctorProfileService } from "../../../../../services/Doctor/ProfileService";

const PerInfor = ({ navigation }) => {
    const { setHeaderTitle } = useContext(HeaderTitleContext);
    const [isEditing, setIsEditing] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({});
    const { user } = useAuth();

    const fetchData = async () => {
        try {
            const response = await fetchDoctorInfor(user.id);
            const data = response || {};
            setDoctorInfo(data);
            setOriginalData(data);
        } catch (error) {
            console.error("Error fetching doctor information:", error);
            setDoctorInfo({});
            setOriginalData({});
            Alert.alert("Lỗi", "Không thể tải thông tin bác sĩ");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const validateFullName = (name) => {
        if (!name || name.trim().length === 0) {
            return "Họ và tên không được để trống";
        }
        if (name.trim().length < 2) {
            return "Họ và tên phải có ít nhất 2 ký tự";
        }
        if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
            return "Họ và tên chỉ được chứa chữ cái và khoảng trắng";
        }
        return null;
    };

    const validateEmail = (email) => {
        if (!email || email.trim().length === 0) {
            return "Email không được để trống";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Email không đúng định dạng";
        }
        return null;
    };

    const validatePhone = (phone) => {
        if (!phone || phone.trim().length === 0) {
            return "Số điện thoại không được để trống";
        }
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return "Số điện thoại không đúng định dạng (VD: 0901234567)";
        }
        return null;
    };

    const validateDOB = (dob) => {
        if (!dob) {
            return "Ngày sinh không được để trống";
        }
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        if (isNaN(birthDate.getTime())) {
            return "Ngày sinh không hợp lệ";
        }
        if (birthDate > today) {
            return "Ngày sinh không thể là tương lai";
        }
        if (age < 18) {
            return "Tuổi phải từ 18 trở lên";
        }
        if (age > 100) {
            return "Ngày sinh không hợp lý";
        }
        return null;
    };

    const validateGender = (gender) => {
        if (!gender || (gender !== "Nam" && gender !== "Nữ")) {
            return "Vui lòng chọn giới tính";
        }
        return null;
    };

    const validateAddress = (address) => {
        if (!address || address.trim().length === 0) {
            return "Địa chỉ không được để trống";
        }
        if (address.trim().length < 10) {
            return "Địa chỉ phải có ít nhất 10 ký tự";
        }
        return null;
    };

    const validateAllFields = () => {
        const newErrors = {};

        const fullNameError = validateFullName(doctorInfo.fullName);
        const emailError = validateEmail(doctorInfo.email);
        const phoneError = validatePhone(doctorInfo.phone);
        const dobError = validateDOB(doctorInfo.dob);
        const genderError = validateGender(doctorInfo.gender);
        const addressError = validateAddress(doctorInfo.address);

        if (fullNameError) newErrors.fullName = fullNameError;
        if (emailError) newErrors.email = emailError;
        if (phoneError) newErrors.phone = phoneError;
        if (dobError) newErrors.dob = dobError;
        if (genderError) newErrors.gender = genderError;
        if (addressError) newErrors.address = addressError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (field, value) => {
        setDoctorInfo({ ...doctorInfo, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const handleNavigationBack = () => {
        navigation.navigate("Profile");
        setHeaderTitle("Hồ sơ cá nhân");
    }

    const getChangedFields = () => {
        const changedFields = {};

        if (doctorInfo.fullName !== originalData.fullName) {
            changedFields.fullName = doctorInfo.fullName;
        }
        if (doctorInfo.email !== originalData.email) {
            changedFields.email = doctorInfo.email;
        }
        if (doctorInfo.phone !== originalData.phone) {
            changedFields.phone = doctorInfo.phone;
        }
        if (doctorInfo.dob !== originalData.dob) {
            changedFields.dob = doctorInfo.dob;
        }
        if (doctorInfo.gender !== originalData.gender) {
            changedFields.gender = doctorInfo.gender;
        }
        if (doctorInfo.address !== originalData.address) {
            changedFields.address = doctorInfo.address;
        }

        return changedFields;
    };

    const handleSave = async () => {
        if (!validateAllFields()) {
            Alert.alert(
                "Lỗi xác thực",
                "Vui lòng kiểm tra lại thông tin đã nhập",
                [{ text: "OK" }]
            );
            return;
        }

        const changedFields = getChangedFields();

        if (Object.keys(changedFields).length === 0) {
            Alert.alert("Thông báo", "Không có thay đổi nào để lưu");
            setIsEditing(false);
            return;
        }

        const fieldLabels = {
            fullName: "Họ và tên",
            email: "Email",
            phone: "Số điện thoại",
            dob: "Ngày sinh",
            gender: "Giới tính",
            address: "Địa chỉ"
        };

        const changedFieldNames = Object.keys(changedFields).map(key => fieldLabels[key] || key);

        Alert.alert(
            "Xác nhận",
            `Bạn có muốn lưu các thay đổi cho: ${changedFieldNames.join(', ')}?`,
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Lưu",
                    onPress: async () => {
                        try {
                            if (updateDoctorProfileService(2, doctorInfo)) {
                                setIsEditing(false);
                                setOriginalData(doctorInfo);
                                Alert.alert("Thành công", "Thông tin đã được cập nhật!");
                            } else {
                                Alert.alert("Thất bại", "Không thể cập nhật thông tin bác sĩ. Vui lòng thử lại sau.");
                            }
                        } catch (error) {
                            console.error("Error saving doctor information:", error);
                            Alert.alert(
                                "Lỗi",
                                error.message || "Có lỗi xảy ra khi lưu thông tin"
                            );
                        }
                    }
                }
            ]
        );
    }

    const handleCancel = () => {
        setIsEditing(false);
        setShowDatePicker(false);
        setErrors({});
        setDoctorInfo({ ...originalData });
    }

    const handleDateConfirm = (selectedDate) => {
        setShowDatePicker(false);
        setDoctorInfo({ ...doctorInfo, dob: selectedDate.toISOString() });

        if (errors.dob) {
            setErrors({ ...errors, dob: null });
        }
    };

    const handleDateCancel = () => {
        setShowDatePicker(false);
    };

    const getValidDate = () => {
        if (doctorInfo?.dob) {
            const date = new Date(doctorInfo.dob);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return new Date();
    };

    const renderField = (label, field, editable = true, multiline = false) => {
        let displayValue = doctorInfo?.[field] || '';
        const hasError = errors[field];
        const hasChanged = doctorInfo[field] !== originalData[field];

        return (
            <View style={styles.fieldContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.fieldLabel}>{label}</Text>
                    {hasChanged && isEditing && (
                        <Text style={styles.changedIndicator}>• Đã thay đổi</Text>
                    )}
                </View>
                <TextInput
                    style={[
                        styles.fieldInput,
                        !editable && styles.fieldInputDisabled,
                        multiline && styles.multilineInput,
                        hasError && styles.fieldInputError,
                        hasChanged && isEditing && styles.fieldInputChanged
                    ]}
                    value={displayValue}
                    onChangeText={(text) => handleFieldChange(field, text)}
                    editable={isEditing && editable}
                    multiline={multiline}
                    numberOfLines={multiline ? 3 : 1}
                    placeholder={field === 'dob' ? 'YYYY-MM-DD' : `Nhập ${label.toLowerCase()}`}
                />
                {hasError && (
                    <Text style={styles.errorText}>{hasError}</Text>
                )}
            </View>
        );
    };

    const renderDateField = () => {
        let displayValue = '';
        if (doctorInfo?.dob) {
            const date = new Date(doctorInfo.dob);
            if (!isNaN(date.getTime())) {
                displayValue = date.toISOString().split('T')[0];
            }
        }

        const hasError = errors.dob;
        const hasChanged = doctorInfo.dob !== originalData.dob;

        return (
            <View style={styles.fieldContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.fieldLabel}>Ngày sinh</Text>
                    {hasChanged && isEditing && (
                        <Text style={styles.changedIndicator}>• Đã thay đổi</Text>
                    )}
                </View>
                <TouchableOpacity
                    style={[
                        styles.fieldInput,
                        !isEditing && styles.fieldInputDisabled,
                        styles.datePickerButton,
                        hasError && styles.fieldInputError,
                        hasChanged && isEditing && styles.fieldInputChanged
                    ]}
                    onPress={() => isEditing && setShowDatePicker(true)}
                    disabled={!isEditing}
                >
                    <Text style={[
                        styles.dateText,
                        !displayValue && styles.placeholderText
                    ]}>
                        {displayValue || 'Chọn ngày sinh'}
                    </Text>
                    <MaterialIcons
                        name="calendar-today"
                        size={20}
                        color={isEditing ? "#1976d2" : "#888"}
                    />
                </TouchableOpacity>
                {hasError && (
                    <Text style={styles.errorText}>{hasError}</Text>
                )}

                <DatePicker
                    modal
                    open={showDatePicker}
                    date={getValidDate()}
                    mode="date"
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                    title="Chọn ngày sinh"
                    confirmText="Xác nhận"
                    cancelText="Hủy"
                />
            </View>
        );
    };

    const renderGenderField = () => {
        const hasError = errors.gender;
        const hasChanged = doctorInfo.gender !== originalData.gender;

        return (
            <View style={styles.fieldContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.fieldLabel}>Giới tính</Text>
                    {hasChanged && isEditing && (
                        <Text style={styles.changedIndicator}>• Đã thay đổi</Text>
                    )}
                </View>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            doctorInfo?.gender === "Nam" && styles.genderOptionSelected,
                            hasError && styles.genderOptionError,
                            hasChanged && isEditing && styles.genderOptionChanged
                        ]}
                        onPress={() => isEditing && handleFieldChange('gender', 'Nam')}
                        disabled={!isEditing}
                    >
                        <Text style={[
                            styles.genderText,
                            doctorInfo?.gender === "Nam" && styles.genderTextSelected
                        ]}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            doctorInfo?.gender === "Nữ" && styles.genderOptionSelected,
                            hasError && styles.genderOptionError,
                            hasChanged && isEditing && styles.genderOptionChanged
                        ]}
                        onPress={() => isEditing && handleFieldChange('gender', 'Nữ')}
                        disabled={!isEditing}
                    >
                        <Text style={[
                            styles.genderText,
                            doctorInfo?.gender === "Nữ" && styles.genderTextSelected
                        ]}>Nữ</Text>
                    </TouchableOpacity>
                </View>
                {hasError && (
                    <Text style={styles.errorText}>{hasError}</Text>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f6f8fa", marginBottom: 25 }}>
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

                <View style={styles.headerTitle}>
                    <Text style={styles.titleText}>Thông tin cá nhân</Text>
                </View>

                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => setIsEditing(!isEditing)}
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name={isEditing ? "close" : "edit"}
                        size={20}
                        color="#1976d2"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.formCard}>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarCircle}>
                            <MaterialIcons name="person" size={40} color="#1976d2" />
                        </View>
                        <Text style={styles.doctorName}>{originalData?.fullName || 'Chưa có tên'}</Text>
                        <Text style={styles.doctorSpecialization}>{originalData?.specialty || 'Chưa có chuyên khoa'}</Text>
                    </View>

                    <View style={styles.formSection}>
                        {renderField("Họ và tên", "fullName")}
                        {renderField("Email", "email")}
                        {renderField("Số điện thoại", "phone")}
                        {renderDateField()}
                        {renderGenderField()}
                        {renderField("Địa chỉ", "address", true, true)}
                    </View>

                    {isEditing && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.cancelBtn]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.cancelBtnText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.saveBtn]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveBtnText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1976d2',
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e3eefd',
        shadowColor: '#1976d2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    editBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 5,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e3f2fd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    doctorName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    doctorSpecialization: {
        fontSize: 16,
        color: '#1976d2',
        fontWeight: '500',
    },
    formSection: {
        gap: 16,
    },
    fieldContainer: {
        marginBottom: 4,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    changedIndicator: {
        fontSize: 12,
        color: '#ff9800',
        fontWeight: '500',
    },
    fieldInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    fieldInputDisabled: {
        backgroundColor: '#f5f5f5',
        color: '#888',
    },
    fieldInputError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },
    fieldInputChanged: {
        borderColor: '#ff9800',
        backgroundColor: '#fff8e1',
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    placeholderText: {
        color: '#888',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelBtn: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    saveBtn: {
        backgroundColor: '#1976d2',
    },
    cancelBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    genderOption: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    genderOptionSelected: {
        backgroundColor: '#1976d2',
        borderColor: '#1976d2',
    },
    genderOptionError: {
        borderColor: '#ff4444',
        borderWidth: 2,
    },
    genderOptionChanged: {
        borderColor: '#ff9800',
        backgroundColor: '#fff8e1',
    },
    genderText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    genderTextSelected: {
        color: '#fff',
    },
});

export default PerInfor;