import { createModel } from '@rematch/core';

import { homeService } from '@/services';

export const home = createModel({
  state: {
    data: {
      winnerList: [],
      bannerList: [],
      classData: [],
      hotList: {
        data: [],
        total: 0,
      },
      latestList: {
        data: [],
        total: 0,
      },
      endList: {
        data: [],
        total: 0,
      },
      sortList: {
        data: [],
        total: 0,
      },
      order: null,
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
          hotList: {
            data: state.data.hotList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    getLatestList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          latestList: {
            data: state.data.latestList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    getEndList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          endList: {
            data: state.data.endList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    getSortList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          sortList: {
            data: state.data.sortList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    clear(state) {
      return {
        ...state,
        data: {
          ...state.data,
          hotList: {
            data: [],
            total: 0,
          },
          latestList: {
            data: [],
            total: 0,
          },
          endList: {
            data: [],
            total: 0,
          },
          sortList: {
            data: [],
            total: 0,
          },
        },
      };
    },
    getValueList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          sortList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
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
    async fetchGetLatestList(payload) {
      const response = await homeService.homeLatestLit(payload);
      dispatch.home.getLatestList(response);
    },
    async fetchGetEndList(payload) {
      const response = await homeService.homeEndLit(payload);
      dispatch.home.getEndList(response);
    },
    async fetchGetSortList(payload) {
      const response = await homeService.homeSortLit(payload);
      if (payload.order) {
        dispatch.home.getValueList(response);
      } else {
        dispatch.home.getSortList(response);
      }
    },
    async fetchConf() {
      await homeService.homeConf();
    },
    async clearList() {
      dispatch.home.clear();
    },
  }),
});
