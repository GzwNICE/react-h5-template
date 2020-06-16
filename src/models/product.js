import { createModel } from '@rematch/core';

import { productService } from '@/services';

export const product = createModel({
  state: {
    data: {
      rules: {},
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
  },
  effects: dispatch => ({
    async getRules(payload) {
      const response = await productService.fetchRules(payload);
      dispatch.product.saveRules(response);
      return response;
    },
  }),
});
