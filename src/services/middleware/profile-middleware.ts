import { socketMiddleware, type TWsActions } from './socket-middleware';

export const profileWsActions: TWsActions = {
  wsInit: 'PROFILE_WS_INIT',
  wsClose: 'PROFILE_WS_CLOSE',
  wsSendMessage: 'PROFILE_WS_SEND_MESSAGE',
  onOpen: 'PROFILE_WS_OPEN',
  onClose: 'PROFILE_WS_ONCLOSE',
  onError: 'PROFILE_WS_ERROR',
  onMessage: 'PROFILE_WS_MESSAGE',
};

export const profileMiddleware = socketMiddleware(profileWsActions);
