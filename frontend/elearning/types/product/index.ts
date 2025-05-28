export interface Product{
    id:string;
    name: string;
    icon?:string;
    tags:string[];
    description: string;
    price: number;
    discount?: number;
    thumbnail: string;
    created_at: Date;
    statusPending: boolean;
}