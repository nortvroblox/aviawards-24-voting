export type Category = {
    options: {
        [key: string]: {
            description: string;
            image: string;
        };
    };
    description: string;
    order: number;
}

export type Categories = {
    [key: string]: Category;
}