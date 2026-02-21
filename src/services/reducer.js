import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from '@services/burger-constructor.js';
import ingredientsReducer from '@services/ingredients.js';
import orderReducer from '@services/order.js';
import selectedIngredientsReducer from '@services/selected-ingredient.js';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
});
