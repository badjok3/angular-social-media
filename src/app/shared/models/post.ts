import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: User
}
