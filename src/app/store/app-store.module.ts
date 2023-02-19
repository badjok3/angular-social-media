import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";

import { FeedStoreModule } from "./feed/feed-store.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        FeedStoreModule
    ]
})

export class AppStoreModule { }