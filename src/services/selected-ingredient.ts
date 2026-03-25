import { createSlice } from '@reduxjs/toolkit';

import type { Ingredient, SelectedIngredientState } from '@/types';

const initialState: SelectedIngredientState = {
  selectedIngredient: null,
};

const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload as Ingredient;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { setSelectedIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
