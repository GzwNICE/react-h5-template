import { createModel } from '@rematch/core';

import { commodityService } from '@/services';

export const commodity = createModel({
  state: {
    data: {
      category: [],
      childList: [],
      productList: [],
    },
  },
  reducers: {
    saveCategory(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          category: payload.data,
        },
      };
    },
    saveChild(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          childList: payload.data,
        },
      };
    },
    saveProduct(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          productList: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async getCategory(payload) {
      const response = await commodityService.category(payload);
      dispatch.commodity.saveCategory(response);
      return response;
    },
    async getChild(payload) {
      const response = await commodityService.childList(payload);
      dispatch.commodity.saveChild(response);
      return response;
    },
    async getProduct(payload) {
      const response = await commodityService.productList(payload);
      dispatch.commodity.saveProduct(response);
      return response;
    },
  }),
});
