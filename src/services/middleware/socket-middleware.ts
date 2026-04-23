import type { Middleware } from 'redux';

export type TWsActions = {
  wsInit: string;
  wsClose: string;
  wsSendMessage: string;

  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let wsUrl: string | null = null;

    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempts = 0;

    let manuallyClosed = false;

    const MAX_RECONNECT_ATTEMPTS = 10;
    const BASE_DELAY = 3000;

    const clearReconnectTimer = (): void => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const getReconnectDelay = (): number => {
      return Math.min(BASE_DELAY * 2 ** reconnectAttempts, 30000);
    };

    const scheduleReconnect = (): void => {
      if (manuallyClosed) return;
      if (!wsUrl) return;
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;

      clearReconnectTimer();

      const delay = getReconnectDelay();

      reconnectTimer = setTimeout(() => {
        reconnectAttempts += 1;
        connect();
      }, delay);
    };

    const connect = (): void => {
      if (!wsUrl) return;

      try {
        socket = new WebSocket(wsUrl);

        socket.onopen = (): void => {
          reconnectAttempts = 0;
          clearReconnectTimer();

          store.dispatch({
            type: wsActions.onOpen,
          });
        };

        socket.onmessage = (event: MessageEvent): void => {
          try {
            const data = JSON.parse(event.data);

            store.dispatch({
              type: wsActions.onMessage,
              payload: data,
            });
          } catch {
            store.dispatch({
              type: wsActions.onError,
              payload: 'Ошибка обработки сообщения WebSocket',
            });
          }
        };

        socket.onerror = (): void => {
          store.dispatch({
            type: wsActions.onError,
            payload: 'Ошибка WebSocket соединения',
          });
        };

        socket.onclose = (): void => {
          store.dispatch({
            type: wsActions.onClose,
          });

          socket = null;

          if (!manuallyClosed) {
            scheduleReconnect();
          }
        };
      } catch {
        store.dispatch({
          type: wsActions.onError,
          payload: 'Ошибка создания WebSocket соединения',
        });

        scheduleReconnect();
      }
    };

    return (next) => (action: unknown) => {
      const { type, payload } = action as { type: string; payload?: { url?: string } };

      switch (type) {
        case wsActions.wsInit: {
          wsUrl = payload?.url ?? null;

          if (!wsUrl) return next(action);

          manuallyClosed = false;
          reconnectAttempts = 0;

          clearReconnectTimer();

          if (socket) {
            socket.close();
          }

          connect();
          break;
        }

        case wsActions.wsClose: {
          manuallyClosed = true;

          clearReconnectTimer();

          if (socket) {
            socket.close();
            socket = null;
          }

          break;
        }

        case wsActions.wsSendMessage: {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
          } else {
            store.dispatch({
              type: wsActions.onError,
              payload: 'WebSocket не подключён',
            });
          }

          break;
        }

        default:
          break;
      }

      return next(action);
    };
  };
};
