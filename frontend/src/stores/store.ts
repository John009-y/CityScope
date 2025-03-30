import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import discussionsSlice from './discussions/discussionsSlice';
import housing_transit_scoresSlice from './housing_transit_scores/housing_transit_scoresSlice';
import propertiesSlice from './properties/propertiesSlice';
import reportsSlice from './reports/reportsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import tenantsSlice from './tenants/tenantsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    discussions: discussionsSlice,
    housing_transit_scores: housing_transit_scoresSlice,
    properties: propertiesSlice,
    reports: reportsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    tenants: tenantsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
