export default interface User {
        [x: string]: any;
        email: string;
        roles?: string[];
    }