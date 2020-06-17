import { createModel } from '@rematch/core';

import { paymentService } from '@/services';

export const payment = createModel({
  state: {
    data: {
      paymentList: {
        data: [],
        total: 0,
      },
    },
  },
  reducers: {
    refreshList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          paymentList: {
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
          paymentList: {
            data: state.data.paymentList.data.concat(payload.data.rows),
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
          paymentList: {
            data: [],
            total: 0,
          },
        },
      };
    },
  },
  effects: dispatch => ({
    async getRefreshList(payload) {
      const response = await paymentService.getPaymentList(payload);
      dispatch.payment.refreshList(response);
    },
    async getLoadList(payload) {
      const response = await paymentService.getPaymentList(payload);
      console.log("response", response)
      dispatch.payment.loadList(response);
    },
    async clearPaymentList(payload) {
      dispatch.payment.clearList(payload);
    },
  }),
});
