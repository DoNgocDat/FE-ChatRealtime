import axiosClient from "../config/axiosClient";
import { LoginRequest, LoginResponse } from "../type/loginType";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/auth/login", data);
    return response.data;
};