import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '@/utils/constans';
import { request } from '@/utils/request';

import type { IngredientsResponse, IngredientsState, Ingredient } from '@/types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response: IngredientsResponse = await request(`${BASE_URL}/ingredients`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка загрузки ингредиентов');
    }
  }
);

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectIngredientById = (
  state: { ingredients: IngredientsState },
  id: string
): Ingredient | undefined =>
  state.ingredients.ingredients.find((ingredient) => ingredient._id === id);

export default ingredientsSlice.reducer;
