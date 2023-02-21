import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FeedService } from '@feed/services/feed.service';
import { ToastrService } from 'ngx-toastr';

import { loadPosts, loadPostsSuccess, loadPostsFail, addPost, addPostSuccess, addPostFail, deletePost, deletePostSuccess, deletePostFail } from './feed.actions';
import { Post } from '@shared/models/post';

@Injectable()
export class FeedEffects {
    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            mergeMap(() => this.feedService.getPosts().pipe(
                map(posts => loadPostsSuccess({ posts })),
                catchError((error) => of(loadPostsFail({ error })))
            ))
        )
    );

    addPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addPost),
            mergeMap((post: Post) => this.feedService.addPost(post).pipe(
                map(post => {
                    this.toastr.success('Post added successfully', 'Success!');
                    return addPostSuccess(post);
                }),
                catchError((error) => of(addPostFail({ error })))
            ))
        )
    );

    deletePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePost),
            mergeMap((post: Post) => this.feedService.deletePost(post).pipe(
                map(id => {
                    this.toastr.success('Post deleted successfully', 'Success!')
                    return deletePostSuccess({ id })
                }),
                catchError((error) => of(deletePostFail({ error })))
            ))
        ))

    constructor(private actions$: Actions, private feedService: FeedService, private toastr: ToastrService) { }
}
