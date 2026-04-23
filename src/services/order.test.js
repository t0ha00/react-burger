import { describe, it, expect } from 'vitest';

import orderReducer, { clearOrder, createOrder } from './order.js';

describe('orderSlice', () => {
  const initialState = {
    orderNumber: null,
    orderName: null,
    isLoading: false,
    error: null,
  };

  it('должен вернуть начальное состояние', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен очистить заказ', () => {
    const stateWithOrder = {
      orderNumber: 12345,
      orderName: 'Бургер',
      isLoading: false,
      error: null,
    };
    const action = clearOrder();
    const state = orderReducer(stateWithOrder, action);

    expect(state.orderNumber).toBeNull();
    expect(state.orderName).toBeNull();
    expect(state.error).toBeNull();
  });

  it('должен установить isLoading в true при создании заказа', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить данные заказа при успешном создании', () => {
    const payload = { order: { number: 12345 }, name: 'Бургер' };
    const action = { type: createOrder.fulfilled.type, payload };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderNumber).toBe(12345);
    expect(state.orderName).toBe('Бургер');
  });

  it('должен установить ошибку при неудачном создании', () => {
    const payload = 'Ошибка оформления заказа';
    const action = { type: createOrder.rejected.type, payload };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(payload);
  });
});
