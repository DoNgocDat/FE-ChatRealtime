export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    displayname: string;
    birthday: Date;
}

export interface ApiResponse<T> {
    data: T;
    status: string;
}