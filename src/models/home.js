import { createModel } from '@rematch/core';

import { homeService } from '@/services';

export const home = createModel({
  state: {
    data: {
      winnerList: [],
      bannerList: [],
      classData: [],
      hotList: [],
    },
  },
  reducers: {
    getWinner(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          winnerList: payload.data,
        },
      };
    },
    getBanner(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          bannerList: payload.data,
        },
      };
    },
    getClass(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          classData: payload.data,
        },
      };
    },
    getHotList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          hotList: payload.data.rows,
        },
      };
    },
  },
  effects: dispatch => ({
    async fetchGetWin(payload) {
      const response = await homeService.homeCarousel(payload);
      dispatch.home.getWinner(response);
    },
    async fetchGetBanner(payload) {
      const response = await homeService.homeBanner(payload);
      dispatch.home.getBanner(response);
    },
    async fetchGetClass(payload) {
      const response = await homeService.homeClass(payload);
      dispatch.home.getClass(response);
    },
    async fetchGetHotList(payload) {
      const response = await homeService.homeHotLit(payload);
      dispatch.home.getHotList(response);
    },
  }),
});
