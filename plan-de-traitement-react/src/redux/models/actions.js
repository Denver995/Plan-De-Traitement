import * as types from './types';

export const createModel = (payload) => ({
  type: types.CREATE_MODEL_REQUEST,
  payload
});

export const updateModel = (payload) => ({
  type: types.UPDATE_MODEL_REQUEST,
  payload
});