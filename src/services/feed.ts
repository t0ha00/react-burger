import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { FeedState, Order } from '@/types';

const WS_URL = 'wss://new-stellarburgers.education-services.ru/orders/all';

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

export const connectWebSocket = createAsyncThunk(
  'feed/connectWebSocket',
  async (_, { dispatch }): Promise<void> => {
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;

    const connect = (): void => {
      ws = new WebSocket(WS_URL);

      ws.onopen = (): void => {
        console.log('WebSocket connected');
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      };

      ws.onmessage = (event: MessageEvent): void => {
        const data = JSON.parse(event.data);
        if (data.success) {
          dispatch(feedSlice.actions.setOrders(data));
        }
      };

      ws.onerror = (error: Event): void => {
        console.error('WebSocket error:', error);
        dispatch(feedSlice.actions.setError('Ошибка подключения к WebSocket'));
      };

      ws.onclose = (): void => {
        console.log('WebSocket disconnected, reconnecting in 5 seconds...');
        reconnectTimer = setTimeout(() => {
          connect();
        }, 5000);
      };
    };

    connect();
  }
);

export const connectUserWebSocket = createAsyncThunk(
  'feed/connectUserWebSocket',
  async (_, { dispatch }): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      dispatch(feedSlice.actions.setError('Нет токена доступа'));
      throw new Error('No access token');
    }

    const token = accessToken.replace('Bearer ', '');
    const wsUrl = `wss://new-stellarburgers.education-services.ru/orders?token=${token}`;
    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout | null = null;

    const connect = (): void => {
      ws = new WebSocket(wsUrl);

      ws.onopen = (): void => {
        console.log('User WebSocket connected');
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      };

      ws.onmessage = (event: MessageEvent): void => {
        const data = JSON.parse(event.data);
        if (data.success) {
          dispatch(feedSlice.actions.setOrders(data));
        } else if (data.message === 'Invalid or missing token') {
          dispatch(feedSlice.actions.setError('Токен устарел или недействителен'));
          dispatch(feedSlice.actions.clearOrders());
        }
      };

      ws.onerror = (error: Event): void => {
        console.error('User WebSocket error:', error);
        dispatch(feedSlice.actions.setError('Ошибка подключения к WebSocket'));
      };

      ws.onclose = (): void => {
        console.log('User WebSocket disconnected, reconnecting in 5 seconds...');
        reconnectTimer = setTimeout(() => {
          connect();
        }, 5000);
      };
    };

    connect();
  }
);

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        WS_URL.replace('wss://', 'https://').replace('/orders/all', '/orders/all')
      );
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка загрузки заказов');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
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
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = feedSlice.actions;
export default feedSlice.reducer;

// Селекторы
export const selectFeedOrders = (state: { feed: FeedState }): Order[] =>
  state.feed.orders;
export const selectFeedTotal = (state: { feed: FeedState }): number => state.feed.total;
export const selectFeedTotalToday = (state: { feed: FeedState }): number =>
  state.feed.totalToday;
export const selectFeedLoading = (state: { feed: FeedState }): boolean =>
  state.feed.isLoading;
export const selectFeedError = (state: { feed: FeedState }): string | null =>
  state.feed.error;

export const selectOrderById = (
  state: { feed: FeedState },
  orderId: string
): Order | undefined => {
  return state.feed.orders.find((order) => order._id === orderId);
};
