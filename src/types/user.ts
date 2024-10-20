
export interface User {
    userId: number;
    username: string;
    age: string;
    phone: string;
    sex: string;
    realName: string;
    roles: string[]
}

export interface Register {
    username: string;
    password: string;
    phone: string;
    realName: string;
    sex: string;
    age: string;
}