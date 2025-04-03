import axiosClient from "../config/axiosClient";
import { RegisterRequest, RegisterResponse } from "../type/registerType";

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosClient.post<RegisterResponse>("/auth/register", data);
    return response.data;
}