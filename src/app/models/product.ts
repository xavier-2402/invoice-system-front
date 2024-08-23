import { Supplier } from "./supplier";

export interface Product{
    productId?:number;
    stock?:number;
    unitPrice?:number;
    iva?:boolean;
    name?:string;
    supplier:Supplier
    sales?:number;
}