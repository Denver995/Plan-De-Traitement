import * as types from './types';

export const alert = (alert) => ({
  type: types.SHOW_ALERT,
  alert,
})