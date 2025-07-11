import { acceptRequestApi, rejectRequestApi } from "../../Api/Doctor/RequestApi";

export const AcceptRequestService = async (requestId) => {
    try {
        acceptRequestApi(requestId);
        return true;
    } catch (error) {
        console.error('Error accepting request:', error);
        throw error;
    }
}

export const RejectRequestService = async (requestId) => {
    try {
        rejectRequestApi(requestId);
        return true;
    } catch (error) {
        console.error('Error rejecting request:', error);
        throw error;
    }
}