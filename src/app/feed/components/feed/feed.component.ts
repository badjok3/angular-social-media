import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from '@shared/models/post';

import { deletePost, loadPosts } from '@store/feed/feed.actions';
import { getPostsSelector } from '@store/feed/feed.selectors';
import { FeedState } from '@store/feed/feed.reducer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private store: Store<FeedState>) {
    this.posts$ = store.pipe(select(getPostsSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  deletePost(post: Post): void {
    this.store.dispatch(deletePost(post));
  }
}
