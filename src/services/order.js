import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ORDER_URL } from '@/utils/constans';
import { request } from '@/utils/request';

import { selectOrderIngredients } from './burger-constructor.js';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const ingredients = selectOrderIngredients(state);

      if (ingredients.length === 0) {
        return rejectWithValue('Нет ингредиентов для заказа');
      }

      const response = await request(ORDER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка оформления заказа');
    }
  }
);

const initialState = {
  orderNumber: null,
  orderName: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.orderName = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload.order.number;
        state.orderName = action.payload.name;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
