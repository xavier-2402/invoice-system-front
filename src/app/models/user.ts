import { Person } from "./person";

export interface User{
    userId?:number;
    person?:Person;
    username:string;
    password:string;

}