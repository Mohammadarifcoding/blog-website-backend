export interface Image {
    url: string;
    alt: string;
}



export interface Blog {
    _id?: string;
    title: string;
    content: string[];
    author: string;
    tags?: string[];
    category: string;
    images?: Image[];
    postType: 'guest' | 'admin';
    userId: string;
    likes?: number;
    isDeleted:true
}

