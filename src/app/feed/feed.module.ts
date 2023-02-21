import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeedComponent } from '@feed/components/feed';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  declarations: [
    FeedComponent,
    AddPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class FeedModule { }
