import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FeedService } from '@feed/services/feed.service';
import { loadPosts, loadPostsSuccess, loadPostsFail } from './feed.actions';

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

    constructor(private actions$: Actions, private feedService: FeedService) { }
}
