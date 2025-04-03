import axiosClient from "../config/axiosClient";
import { ApiResponse, User } from "../type/userType";

export const getUserInfo = async (accessToken: string): Promise<User | null> => {
    try {
        const response = await axiosClient.get<ApiResponse<User>>('/auth/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200 && response.data.status === 'success') {
            return response.data.data;
        }
        console.error('error api:', response.status);
        return null;
    } catch (error) {
        console.error('error get user information:', error);
        return null;
    }
};