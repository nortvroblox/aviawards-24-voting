export type Data = {
    voted: {
        // string: string | boolean
        [category: string]: string | boolean
    };
};
const DATA_TEMPLATE: Data = {
	voted: {},
};
export { DATA_TEMPLATE };
