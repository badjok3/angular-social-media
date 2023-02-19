import { createSelector } from "@ngrx/store";
import { createFeatureSelector } from "@ngrx/store";

import { FeedState } from "./feed.reducer";
import { feedFeatureKey } from "./feature-key";

export const getPostsFeature = createFeatureSelector<FeedState>(feedFeatureKey);

export const getPostsSelector = createSelector(
    getPostsFeature,
    state => state.posts
);
