import { createModel } from '@rematch/core';

import { orderService } from '@/services';

export const order = createModel({
  state: {
    data: {
      orderList: {
        data: [],
        total: 0,
      },
      goCoinDetail: {},
    },
  },
  reducers: {
    refreshList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          orderList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          orderList: {
            data: state.data.orderList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },

    clearList(state) {
      return {
        ...state,
        data: {
          ...state.data,
          orderList: {
            data: [],
            total: 0,
          },
        },
      };
    },
    exchangeDetail(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          goCoinDetail: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async getRefreshList(payload) {
      const response = await orderService.getOrderList(payload);
      dispatch.order.refreshList(response);
    },
    async getLoadList(payload) {
      const response = await orderService.getOrderList(payload);
      dispatch.order.loadList(response);
    },
    async clearOrderList(payload) {
      dispatch.order.clearList(payload);
    },
    async getExchangeDetail(payload) {
      const response = await orderService.exchangeDetail(payload);
      dispatch.order.exchangeDetail(response);
    },
  }),
});
