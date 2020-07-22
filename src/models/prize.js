import { createModel } from '@rematch/core';

import { prizeService } from '@/services';

export const prize = createModel({
  state: {
    data: {
      prizeInfo: {
        appRewardRulesVO: {},
        prizesProductVO: {},
        shoppingAddressVO: {},
      },
      prize: {},
    },
  },
  reducers: {
    clearAdd(state) {
      return {
        ...state,
        data: {
          ...state.data,
          address: {},
        },
      };
    },
    saveInfo(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          prizeInfo: payload.data,
        },
      };
    },
    savePrize(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          prize: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async saveAddress(payload) {
      localStorage.setItem('address', JSON.stringify(payload));
    },
    async clearAddress() {
      localStorage.removeItem('address');
    },
    async prizeInfo(payload) {
      const response = await prizeService.getPrizeInfo(payload);
      dispatch.prize.saveInfo(response);
      return response;
    },
    async submit(payload) {
      const response = await prizeService.submitPrize(payload);
      dispatch.prize.savePrize(response);
      return response;
    },
    async result(payload) {
      const response = await prizeService.resultInfo(payload);
      dispatch.prize.savePrize(response);
      return response;
    },
    async getSelInfo(payload) {
      const response = await prizeService.sltInfo(payload);
      return response;
    },
    async coinsFetch(payload) {
      const response = await prizeService.goChange(payload);
      return response;
    },
    async cashFetch(payload) {
      const response = await prizeService.cashChange(payload);
      return response;
    },
  }),
});
