import { Guid } from "guid-typescript";

export interface User {
    name: string,
    id: Guid,
    age: number,
    userName: string,
    role: string,
    password: string
}