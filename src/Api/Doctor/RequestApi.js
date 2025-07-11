const API_BASE_URL = 'http://10.0.2.2:5000/doctor';

export const fetchRequestsByDoctorId = async (doctorId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/requests?doctorId=${doctorId}`);
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch requests: ${response.status} ${errorText}`);
        }
    } catch (error) {
        throw error;
    }
};

export const acceptRequestApi = async (requestId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/request/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId: String(requestId) }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to accept request: ${response.status} ${errorText}`);
        }
    } catch (error) {
        console.error('Error accepting request:', error);
        throw error;
    }
}

export const rejectRequestApi = async (requestId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/request/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId: String(requestId) }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to reject request: ${response.status} ${errorText}`);
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        throw error;
    }
}