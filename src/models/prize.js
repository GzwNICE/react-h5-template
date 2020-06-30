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
      address: {},
    },
  },
  reducers: {
    saveAdd(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          address: payload,
        },
      };
    },
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
  },
  effects: dispatch => ({
    async saveAddress(payload) {
      dispatch.prize.saveAdd(payload);
    },
    async clearAddress(payload) {
      dispatch.prize.clearAdd(payload);
    },
    async prizeInfo(payload) {
      const response = await prizeService.getPrizeInfo(payload);
      dispatch.prize.saveInfo(response);
      return response;
    },
  }),
});
