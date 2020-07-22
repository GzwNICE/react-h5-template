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
      luckCodeList: {
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
            total: payload.data.total ? payload.data.total : 0,
          },
        },
      };
    },
    saveLuck(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          luckCodeList: {
            ...payload.data,
            rows: payload.data.rows
              ? state.data.luckCodeList.rows.concat(payload.data.rows)
              : state.data.luckCodeList.rows,
            total: payload.data.total ? payload.data.total : 0,
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
    async getDrawCode(payload) {
      const response = await productService.fetchDrawCode(payload);
      dispatch.product.saveLuck(response);
      return response;
    },
    async buy(payload) {
      const response = await productService.fetchBuy(payload);
      return response;
    },
    async buyConfirm(payload) {
      const response = await productService.fetchBuyConfirm(payload);
      return response;
    },
    async buyCancel(payload) {
      const response = await productService.fetchBuyCancel(payload);
      return response;
    },
    async existRules(payload) {
      const response = await productService.fetchExistRules(payload);
      return response;
    },
    async awardRule(payload) {
      const response = await productService.awardRules(payload);
      return response;
    },
  }),
});
