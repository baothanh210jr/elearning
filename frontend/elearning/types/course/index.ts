export interface Course{
    id:string;
    title: string;
    icon:string;
    statusPending?:boolean;
    tags:string[];
    description: string;
    duration: number;
    content: string;
    pricing: number;
    discount: number;
    thumbnail: string;
    created_at: Date;
    student:{
        directus_users_id:{
            avatar?:string;
        }
    }[]
}