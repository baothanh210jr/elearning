import type { Product } from '../product';
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon?: string;
    products?: Product[];
}
