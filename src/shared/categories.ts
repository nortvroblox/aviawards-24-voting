export type Category = {
    options: {
        [key: string]: {
            description: string;
            image: string;
        };
    };
    description: string;
}

export type Categories = {
    [key: string]: Category;
}