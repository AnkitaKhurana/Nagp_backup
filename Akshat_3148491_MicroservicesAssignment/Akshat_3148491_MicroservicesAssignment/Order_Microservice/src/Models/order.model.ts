export interface Order {
    id: string;
    userName: string;
    status: string;
    productsList: Product[];
    amount: number;
    address?: string;
    delivery?: string;
}

export interface Product {
    id: string;
    name: string;
    quantity: number;
    amount: number;
}