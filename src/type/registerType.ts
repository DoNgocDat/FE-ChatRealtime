export interface RegisterRequest {
    username : string;
    password: string;
    email: string;
    displayname: string;
    birthday: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}