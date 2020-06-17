import { createModel } from '@rematch/core';

import { productService } from '@/services';

export const product = createModel({
  state: {
    data: {
      rules: {},
      detail: {},
    },
  },
  reducers: {
    saveRules(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          rules: payload.data,
        },
      };
    },
    saveDetail(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          detail: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async getRules(payload) {
      const response = await productService.fetchRules(payload);
      dispatch.product.saveRules(response);
    },
    async getDetail(payload) {
      const response = await productService.fetchInfo(payload);
      dispatch.product.saveDetail(response);
      return response;
    },
  }),
});