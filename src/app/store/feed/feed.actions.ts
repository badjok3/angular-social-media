import { createAction, props } from '@ngrx/store';
import { Post } from '@shared/models/post';

export const loadPosts = createAction('[Post List] Load Posts');
export const loadPostsSuccess = createAction('[Post List] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFail = createAction('[Post List] Load Posts Fail', props<{ error: string }>());

export const addPost = createAction('[Post List] Add Post', props<Post>());
export const addPostSuccess = createAction('[Post List] Add Post Success', props<Post>());
export const addPostFail = createAction('[Post List] Add Posts Fail', props<{ error: string }>());

export const deletePost = createAction('[Post List] Delete Post', props<Post>());
export const deletePostSuccess = createAction('[Post List] Delete Post Success', props<{ id: Post['id'] }>());
export const deletePostFail = createAction('[Post List] Delete Post Fail', props<{ error: string }>());
