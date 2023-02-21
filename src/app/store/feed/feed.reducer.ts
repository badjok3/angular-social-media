import { createReducer, on } from '@ngrx/store';
import { Post } from '@shared/models/post';
import { addPost, addPostFail, addPostSuccess, deletePost, deletePostFail, deletePostSuccess, loadPosts, loadPostsFail, loadPostsSuccess } from './feed.actions';

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
    on(addPost, (state, post) => state),
    on(addPostSuccess, (state, post) => {
        let posts = [...state.posts];
        posts.push(post);
        return {
            ...state,
            posts
        } as FeedState
    }),
    on(addPostFail, (state, { error }) => {
        return {
            ...state,
            error
        } as FeedState
    }),
    on(deletePost, (state, post) => state),
    on(deletePostSuccess, (state, payload) => {
        let posts = state.posts.filter(post => post.id !== payload.id);
        return {
            ...state,
            posts
        } as FeedState
    }),
    on(deletePostFail, (state, { error }) => {
        return {
            ...state,
            error
        } as FeedState
    }),
);
