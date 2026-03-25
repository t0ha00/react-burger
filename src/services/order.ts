import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '@/utils/constans';
import { request } from '@/utils/request';

import { selectOrderIngredients } from './burger-constructor';

import type { OrderResponse, OrderState } from '@/types';

import type { RootState } from './store';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const ingredients = selectOrderIngredients(state);

      if (ingredients.length === 0) {
        return rejectWithValue('Нет ингредиентов для заказа');
      }
      const accessToken = localStorage.getItem('accessToken');
      const response: OrderResponse = (await request(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken || '',
        },
        body: JSON.stringify({ ingredients }),
      })) as OrderResponse;

      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка оформления заказа');
    }
  }
);

const initialState: OrderState = {
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
        state.error = action.payload as string;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderLoading = (state: { order: OrderState }): boolean =>
  state.order.isLoading;
