import { socketMiddleware, type TWsActions } from './socket-middleware';

export const feedWsActions: TWsActions = {
  wsInit: 'FEED_WS_INIT',
  wsClose: 'FEED_WS_CLOSE',
  wsSendMessage: 'FEED_WS_SEND_MESSAGE',
  onOpen: 'FEED_WS_OPEN',
  onClose: 'FEED_WS_ONCLOSE',
  onError: 'FEED_WS_ERROR',
  onMessage: 'FEED_WS_MESSAGE',
};

export const feedMiddleware = socketMiddleware(feedWsActions);
