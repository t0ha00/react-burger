import { describe, it, expect } from 'vitest';

import selectedIngredientReducer, {
  setSelectedIngredient,
  clearSelectedIngredient,
} from './selected-ingredient.js';

describe('selectedIngredientSlice', () => {
  const initialState = {
    selectedIngredient: null,
  };

  it('должен вернуть начальное состояние', () => {
    expect(selectedIngredientReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен установить выбранный ингредиент', () => {
    const ingredient = { _id: '1', name: 'Bun', price: 100 };
    const action = setSelectedIngredient(ingredient);
    const state = selectedIngredientReducer(initialState, action);

    expect(state.selectedIngredient).toEqual(ingredient);
  });

  it('должен очистить выбранный ингредиент', () => {
    const stateWithIngredient = {
      selectedIngredient: { _id: '1', name: 'Bun', price: 100 },
    };
    const action = clearSelectedIngredient();
    const state = selectedIngredientReducer(stateWithIngredient, action);

    expect(state.selectedIngredient).toBeNull();
  });
});
