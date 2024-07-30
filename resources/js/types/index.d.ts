export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Post {
    id: number,
    title: string,
    teaser: string,
}

export interface Meta {
    next_cursor: string;
    path: string;
    per_page: number;
    prev_cursor: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
