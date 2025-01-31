export interface User {
    email: string;
    password: string;
}

export interface RegisterPostRequest {
    body: User;
}
