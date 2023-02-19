import { createAction, props } from '@ngrx/store';
import { Post } from '@shared/models/post';

export const loadPosts = createAction('[Post List] Load Posts');
export const loadPostsSuccess = createAction('[Post List] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFail = createAction('[Post List] Load Posts Fail', props<{ error: string }>());
export const addPost = createAction('[Post List] Add Post', props<{ post: Post }>());
export const deletePost = createAction('[Post List] Delete Post', props<{ id: number }>());
