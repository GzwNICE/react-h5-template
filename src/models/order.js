import { createModel } from '@rematch/core';

import { orderService } from '@/services';

export const order = createModel({
  state: {
    data: {
      orderList: {
        data: [],
        total: 0,
      },
    },
  },
  reducers: {
    saveOrderList(state, payload) {
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

    clearList(state, payload) {
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
  },
  effects: dispatch => ({
    async getOrderList(payload) {
      const response = await orderService.getOrderList(payload);
      console.log('response', response);

      dispatch.order.saveOrderList(response);
    },
    async clearOrderList(payload) {
      console.log('clearOrderList');

      dispatch.order.clearList(payload);
    },
  }),
});
