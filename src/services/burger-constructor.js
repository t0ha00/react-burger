import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const { ingredient, uniqueId } = action.payload;
      const ingredientWithId = {
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
      const uniqueId = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.uniqueId !== uniqueId);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredient = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragIngredient);
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor, moveIngredient } =
  burgerConstructorSlice.actions;

export const addIngredientWithId = (ingredient) => {
  return (dispatch) => {
    const uniqueId = nanoid();
    dispatch(addIngredient({ ingredient, uniqueId }));
  };
};

export const selectOrderIngredients = (state) => {
  const { bun, ingredients } = state.burgerConstructor;
  if (!bun) return [];

  const bunId = bun._id;
  const ingredientIds = ingredients.map((item) => item._id);

  return [bunId, ...ingredientIds, bunId];
};

export const selectTotalPrice = (state) => {
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
    (state) => state.burgerConstructor.bun,
    (state) => state.burgerConstructor.ingredients,
  ],
  (bun, ingredients) => {
    const counts = {};

    if (bun) {
      counts[bun._id] = 2;
    }

    ingredients.forEach((ingredient) => {
      const id = ingredient._id;
      counts[id] = (counts[id] || 0) + 1;
    });

    return counts;
  }
);

export default burgerConstructorSlice.reducer;
