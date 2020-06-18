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
    resultDetail(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          goCoinDetail: payload.msg,
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
     /**
     * 虚拟物品详情
     * @param {} payload
     */
    async getExchangeDetail(payload) {
      const response = await orderService.exchangeDetail(payload);
      console.log("detail", response)
      dispatch.order.resultDetail(response);
      return response;

    },
  }),
});
