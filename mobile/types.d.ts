export interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  INITIAL_REDUX_STATE: any;
}

declare let window: Window & typeof globalThis;
