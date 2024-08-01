export interface TImage {
    url: string;
}



export interface TBlog {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    category: string;
    images?: TImage[];
    isDeleted:boolean;
    status:'pending'|'approved'
}

