
export interface User {
    id: number;
    name: string;
    password: string;
    phone: string;
    role: string;
    date: string;
}

export interface Register {
    username: string;
    password: string;
    phone: string;
    realName: string;
    sex: string;
    age: string;
}