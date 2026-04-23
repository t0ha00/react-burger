import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@services/auth';
import burgerConstructorReducer from '@services/burger-constructor';
import feedReducer from '@services/feed';
import ingredientsReducer from '@services/ingredients';
import orderReducer from '@services/order';
import profileFeedReducer from '@services/profile-feed';
import selectedIngredientsReducer from '@services/selected-ingredient';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  profileFeed: profileFeedReducer,
});
