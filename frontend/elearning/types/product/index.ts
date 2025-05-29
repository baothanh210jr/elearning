export interface Product {
    id: string;
    name: string;
    icon?: string;
    description: string;
    price?: number;
    discount?: number;
    thumbnail?: string;
    created_at?: Date;
    statusPending?: boolean;
    category: {
        id: string;
        name: string;
    };
}
