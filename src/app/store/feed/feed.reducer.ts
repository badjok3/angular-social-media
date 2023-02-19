import { createReducer, on } from '@ngrx/store';
import { Post } from '@shared/models/post';
import { addPost, deletePost, loadPosts, loadPostsFail, loadPostsSuccess } from './feed.actions';

export interface FeedState {
    posts: Post[],
    error?: string
}

export const initialFeedState: FeedState = {
    posts: [],
    error: ''
}

export const feedReducer = createReducer<FeedState>(
    initialFeedState,
    on(loadPosts, state => state),
    on(loadPostsSuccess, (state, { posts }) => {
        return {
            ...state,
            posts
        } as FeedState
    }),
    on(loadPostsFail, (state, { error }) => {
        return {
            ...state,
            error
        } as FeedState
    }),
    on(addPost, (state, { post }) => {
        let posts = [...state.posts];
        posts.push(post);
        return { posts } as FeedState
    }),
    on(deletePost, (state, { id }) => {
        let posts = state.posts.filter(post => post.id !== id);
        return { posts } as FeedState
    })
);
