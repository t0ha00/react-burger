import { describe, it, expect } from 'vitest';

import authReducer, {
  clearError,
  setUser,
  logout,
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkAuth,
  updateUser,
} from './auth.js';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('должен вернуть начальное состояние', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('reducers', () => {
    it('должен очистить ошибку', () => {
      const stateWithError = { ...initialState, error: 'Ошибка' };
      const action = clearError();
      const state = authReducer(stateWithError, action);

      expect(state.error).toBeNull();
    });

    it('должен установить пользователя', () => {
      const user = { email: 'test@test.com', name: 'Test' };
      const action = setUser(user);
      const state = authReducer(initialState, action);

      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('должен выполнить выход', () => {
      const stateWithUser = {
        user: { email: 'test@test.com', name: 'Test' },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
      const action = logout();
      const state = authReducer(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('registerUser', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить пользователя при успешной регистрации', () => {
      const payload = { user: { email: 'test@test.com', name: 'Test' } };
      const action = { type: registerUser.fulfilled.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(payload.user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('должен установить ошибку при неудачной регистрации (rejected)', () => {
      const payload = 'Ошибка регистрации';
      const action = { type: registerUser.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
    });
  });

  describe('loginUser', () => {
    it('должен установить isLoading в true', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить пользователя при успешном входе (fulfilled)', () => {
      const payload = { user: { email: 'test@test.com', name: 'Test' } };
      const action = { type: loginUser.fulfilled.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(payload.user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('должен установить ошибку при неудачном входе (rejected)', () => {
      const payload = 'Ошибка входа';
      const action = { type: loginUser.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
    });
  });

  describe('checkAuth', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: checkAuth.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен установить пользователя при успешной проверке (fulfilled)', () => {
      const payload = { user: { email: 'test@test.com', name: 'Test' } };
      const action = { type: checkAuth.fulfilled.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(payload.user);
      expect(state.isAuthenticated).toBe(true);
    });

    it('должен очистить данные при неудачной проверке (rejected)', () => {
      const payload = 'Ошибка проверки токена';
      const action = { type: checkAuth.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('refreshToken', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: refreshToken.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен сбросить isLoading при успешном обновлении (fulfilled)', () => {
      const action = { type: refreshToken.fulfilled.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
    });

    it('должен очистить данные при неудачном обновлении (rejected)', () => {
      const payload = 'Ошибка обновления токена';
      const action = { type: refreshToken.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('logoutUser', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: logoutUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });

    it('должен очистить данные при успешном выходе (fulfilled)', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('должен очистить данные при неудачном выходе (rejected)', () => {
      const payload = 'Ошибка выхода';
      const action = { type: logoutUser.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('forgotPassword', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: forgotPassword.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сбросить isLoading при успешной отправке (fulfilled)', () => {
      const action = { type: forgotPassword.fulfilled.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
    });

    it('должен установить ошибку при неудачной отправке (rejected)', () => {
      const payload = 'Ошибка отправки email';
      const action = { type: forgotPassword.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
    });
  });

  describe('resetPassword', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: resetPassword.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сбросить isLoading при успешном сбросе (fulfilled)', () => {
      const action = { type: resetPassword.fulfilled.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
    });

    it('должен установить ошибку при неудачном сбросе (rejected)', () => {
      const payload = 'Ошибка сброса пароля';
      const action = { type: resetPassword.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
    });
  });

  describe('updateUser', () => {
    it('должен установить isLoading в true (pending)', () => {
      const action = { type: updateUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обновить пользователя при успешном обновлении (fulfilled)', () => {
      const payload = { user: { email: 'new@test.com', name: 'New' } };
      const action = { type: updateUser.fulfilled.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(payload.user);
    });

    it('должен установить ошибку при неудачном обновлении (rejected)', () => {
      const payload = 'Ошибка обновления данных';
      const action = { type: updateUser.rejected.type, payload };
      const state = authReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(payload);
    });
  });
});
