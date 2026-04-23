import { describe, it, expect } from 'vitest';

import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient,
} from './burger-constructor.js';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  it('должен вернуть начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const bun = { _id: '1', name: 'Bun', price: 100, type: 'bun' };
    const action = addIngredient({ ingredient: bun, uniqueId: 'unique-1' });
    const state = burgerConstructorReducer(initialState, action);

    expect(state.bun).toEqual({ ...bun, uniqueId: 'unique-1' });
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавить ингредиент (не булку)', () => {
    const ingredient = { _id: '2', name: 'Sauce', price: 50, type: 'sauce' };
    const action = addIngredient({ ingredient, uniqueId: 'unique-2' });
    const state = burgerConstructorReducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([{ ...ingredient, uniqueId: 'unique-2' }]);
  });

  it('должен удалить ингредиент по uniqueId', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { _id: '1', uniqueId: 'unique-1' },
        { _id: '2', uniqueId: 'unique-2' },
        { _id: '3', uniqueId: 'unique-3' },
      ],
    };
    const action = removeIngredient('unique-2');
    const state = burgerConstructorReducer(stateWithIngredients, action);

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.find((i) => i.uniqueId === 'unique-2')).toBeUndefined();
  });

  it('должен очистить конструктор', () => {
    const stateWithData = {
      bun: { _id: '1', name: 'Bun', price: 100 },
      ingredients: [{ _id: '2', name: 'Sauce', price: 50 }],
    };
    const action = clearConstructor();
    const state = burgerConstructorReducer(stateWithData, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('должен переместить ингредиент', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Ingredient 1' },
        { _id: '2', name: 'Ingredient 2' },
        { _id: '3', name: 'Ingredient 3' },
      ],
    };
    const action = moveIngredient({ dragIndex: 0, hoverIndex: 2 });
    const state = burgerConstructorReducer(stateWithIngredients, action);

    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Ingredient 3');
    expect(state.ingredients[2].name).toBe('Ingredient 1');
  });
});
