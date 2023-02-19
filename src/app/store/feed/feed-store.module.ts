import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { feedFeatureKey } from "./feature-key";
import { feedReducer } from "./feed.reducer";
import { FeedEffects } from "./feed.effects";

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forRoot([FeedEffects]),
        StoreModule.forFeature(feedFeatureKey, feedReducer)
    ]
})

export class FeedStoreModule { }
