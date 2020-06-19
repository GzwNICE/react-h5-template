import { createModel } from '@rematch/core';

import { productService } from '@/services';

export const product = createModel({
  state: {
    data: {
      rules: {},
      detail: {},
      personList: {
        rows: [],
        total: 0,
      },
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
    savePerson(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          personList: {
            ...payload.data,
            rows: payload.data.rows ? state.data.personList.rows.concat(payload.data.rows) : [],
            total: payload.data.total,
          },
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
    async getPersonnel(payload) {
      const response = await productService.fetchParticipants(payload);
      dispatch.product.savePerson(response);
      return response;
    },
  }),
});
