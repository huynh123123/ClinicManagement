import { updateDoctorInfor, checkOldPasswordApi, changePasswordApi } from '../../Api/Doctor/ProfileApi';

export const updateDoctorProfileService = async (id, updatedData) => {
    try {
        return await updateDoctorInfor(id, updatedData);
    } catch (error) {
        console.error("Error updating doctor profile:", error);
        throw error;
    }
}

export const checkOldPasswordService = async (doctorId, oldPassword) => {
    try {
        return await checkOldPasswordApi(doctorId, oldPassword);
    } catch (error) {
        console.error("Error checking old password:", error);
        throw error;
    }
}

export const changePasswordService = async (doctorId, newPassword) => {
    try {
        return await changePasswordApi(doctorId, newPassword);
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}