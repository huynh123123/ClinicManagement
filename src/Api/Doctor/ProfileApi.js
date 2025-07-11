const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchDoctorInfor = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/infor?doctorId=${doctorId}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Failed to fetch doctor profile: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        throw error;
    }
};

export const updateDoctorInfor = async (doctorId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/UpdateInfor`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doctorId, ...updatedData }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to update doctor profile: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Error updating doctor profile:', error);
        throw error;
    }
}

export const checkOldPasswordApi = async (doctorId, oldPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/checkOldPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doctorId, oldPassword }),
        });

        if (response.ok) {
            return response;
        }
    } catch (error) {
        console.error('Error checking old password:', error);
        throw error;
    }
}

export const changePasswordApi = async (doctorId, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/updatePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doctorId, newPassword }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to change password: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}