export const DOCUMENT_LOAD_STATES = {
  LOADING: "downloading",
  LOADED: "downloaded"
};
export const WEBSOCKET_URL = `${process.env.VUE_APP_BACKEND_URL}/documents`;
export const WEBSOCKET_EVENTS = {
  CONNECT: "connect",
  ERROR: "error",
  SUBSCRIBE: "subscribe",
  DOCUMENT_LOAD_DONE: "document:load:done",
  DOCUMENT_LOAD_FAILED: "document:load:failed"
};
