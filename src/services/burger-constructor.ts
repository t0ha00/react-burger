import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';

import type { Dispatch } from '@reduxjs/toolkit';

import type {
  Ingredient,
  IngredientWithId,
  BurgerConstructorState,
  AddIngredientPayload,
  MoveIngredientPayload,
} from '@/types';

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const { ingredient, uniqueId } = action.payload as AddIngredientPayload;
      const ingredientWithId: IngredientWithId = {
        ...ingredient,
        uniqueId,
      };
      if (ingredient.type === 'bun') {
        state.bun = ingredientWithId;
      } else {
        state.ingredients.push(ingredientWithId);
      }
    },
    removeIngredient: (state, action) => {
      const uniqueId = action.payload as string;
      state.ingredients = state.ingredients.filter((item) => item.uniqueId !== uniqueId);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload as MoveIngredientPayload;
      const dragIngredient = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragIngredient);
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor, moveIngredient } =
  burgerConstructorSlice.actions;

export const addIngredientWithId = (
  ingredient: Ingredient
): ((dispatch: Dispatch) => void) => {
  return (dispatch: Dispatch): void => {
    const uniqueId = nanoid();
    dispatch(addIngredient({ ingredient, uniqueId }));
  };
};

export const selectOrderIngredients = (state: {
  burgerConstructor: BurgerConstructorState;
}): string[] => {
  const { bun, ingredients } = state.burgerConstructor;
  if (!bun) return [];

  const bunId = bun._id;
  const ingredientIds = ingredients.map((item) => item._id);

  return [bunId, ...ingredientIds, bunId];
};

export const selectTotalPrice = (state: {
  burgerConstructor: BurgerConstructorState;
}): number => {
  const { bun, ingredients } = state.burgerConstructor;
  let total = 0;

  if (bun) {
    total += bun.price * 2;
  }

  ingredients.forEach((ingredient) => {
    total += ingredient.price;
  });

  return total;
};

export const selectIngredientCounts = createSelector(
  [
    (state: { burgerConstructor: BurgerConstructorState }): IngredientWithId | null =>
      state.burgerConstructor.bun,
    (state: { burgerConstructor: BurgerConstructorState }): IngredientWithId[] =>
      state.burgerConstructor.ingredients,
  ],
  (bun, ingredients): Record<string, number> => {
    const counts: Record<string, number> = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    ingredients.forEach((ingredient): void => {
      const id = ingredient._id;
      counts[id] = (counts[id] || 0) + 1;
    });

    return counts;
  }
);

export default burgerConstructorSlice.reducer;
