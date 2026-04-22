import { createSlice } from '@reduxjs/toolkit';

import { profileWsActions } from './middleware/profile-middleware';

import type { FeedState, Order } from '@/types';

const isValidOrder = (order: unknown): order is Order => {
  if (!order || typeof order !== 'object') {
    return false;
  }

  const orderObj = order as Record<string, unknown>;
  return (
    typeof orderObj._id === 'string' &&
    typeof orderObj.number === 'number' &&
    typeof orderObj.createdAt === 'string' &&
    typeof orderObj.updatedAt === 'string' &&
    typeof orderObj.status === 'string' &&
    typeof orderObj.name === 'string' &&
    Array.isArray(orderObj.ingredients) &&
    orderObj.ingredients.every((ing: unknown) => typeof ing === 'string')
  );
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null,
};

export const connectUserWebSocket = ():
  | { type: string; payload: { url: string } }
  | { type: string; payload: string } => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return { type: profileWsActions.onError, payload: 'Нет токена доступа' };
  }

  const token = accessToken.replace('Bearer ', '');
  const wsUrl = `wss://new-stellarburgers.education-services.ru/orders?token=${token}`;

  return {
    type: profileWsActions.wsInit,
    payload: { url: wsUrl },
  };
};

export const closeUserWebSocket = (): { type: string } => ({
  type: profileWsActions.wsClose,
});

const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setOrders: (state, action) => {
      const validOrders = action.payload.orders.filter(isValidOrder);
      state.orders = validOrders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type === profileWsActions.onOpen,
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type === profileWsActions.onClose,
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type === profileWsActions.onError,
        (state, action) => {
          state.error = (action as unknown as { payload: string }).payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type === profileWsActions.onMessage,
        (state, action) => {
          const payload = (
            action as unknown as {
              payload: {
                success: boolean;
                orders: unknown[];
                total: number;
                totalToday: number;
                message?: string;
              };
            }
          ).payload;
          if (payload.success) {
            const validOrders = payload.orders.filter(isValidOrder);
            state.orders = validOrders;
            state.total = payload.total;
            state.totalToday = payload.totalToday;
            state.isLoading = false;
            state.error = null;
          } else if (payload.message === 'Invalid or missing token') {
            state.error = 'Токен недействителен или отсутствует';
            state.isLoading = false;
            state.orders = [];
          }
        }
      );
  },
});

export const { clearError, clearOrders } = profileFeedSlice.actions;
export default profileFeedSlice.reducer;

// Селекторы
export const selectProfileOrders = (state: { profileFeed: FeedState }): Order[] =>
  state.profileFeed.orders;
export const selectProfileTotal = (state: { profileFeed: FeedState }): number =>
  state.profileFeed.total;
export const selectProfileTotalToday = (state: { profileFeed: FeedState }): number =>
  state.profileFeed.totalToday;
export const selectProfileLoading = (state: { profileFeed: FeedState }): boolean =>
  state.profileFeed.isLoading;
export const selectProfileError = (state: { profileFeed: FeedState }): string | null =>
  state.profileFeed.error;
export const selectProfileOrderById = (
  state: { profileFeed: FeedState },
  id: string
): Order | undefined => state.profileFeed.orders.find((order) => order._id === id);
