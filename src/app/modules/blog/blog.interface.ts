export interface TImage {
    url: string;
}



export interface TBlog {
    title: string;
    content: string;
    author: string;
    tags?: string[];
    category: string;
    images?: string;
    isDeleted:boolean;
    postType:'admin'|'guest'
    status:'pending'|'approved'
}

