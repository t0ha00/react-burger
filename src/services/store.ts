import { configureStore } from '@reduxjs/toolkit';

import { feedMiddleware } from './middleware/feed-middleware';
import { profileMiddleware } from './middleware/profile-middleware';
import { rootReducer } from './reducer.js';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, profileMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
