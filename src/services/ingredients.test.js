import { describe, it, expect } from 'vitest';

import ingredientsReducer, { fetchIngredients } from './ingredients.js';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: true,
    error: null,
  };

  it('должен вернуть начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен установить isLoading в true при загрузке ингредиентов', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить ингредиенты при успешной загрузке (fulfilled)', () => {
    const payload = [
      { _id: '1', name: 'Bun', price: 100 },
      { _id: '2', name: 'Sauce', price: 50 },
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  it('должен установить ошибку при неудачной загрузке (rejected)', () => {
    const payload = 'Ошибка загрузки ингредиентов';
    const action = { type: fetchIngredients.rejected.type, payload };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(payload);
  });
});
