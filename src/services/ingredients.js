import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '@/utils/constans';
import { request } from '@/utils/request';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await request(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка загрузки ингредиентов');
    }
  }
);

const initialState = {
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
        state.error = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;
