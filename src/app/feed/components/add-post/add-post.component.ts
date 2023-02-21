import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from '@shared/models/post';

import { FeedState } from '@store/feed/feed.reducer';
import { addPost } from '@store/feed/feed.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  post$: Post;
  postContent$: string;

  constructor(private store: Store<FeedState>) { }

  addPost(): void {
    this.post$ = {
      id: 0,
      //@ts-ignore
      author: JSON.parse(localStorage.getItem('currentUser')),
      content: this.postContent$
    }
    this.postContent$ = '';
    this.store.dispatch(addPost(this.post$))
  }
}
