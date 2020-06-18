import { createModel } from '@rematch/core';

import { paymentService } from '@/services';

export const payment = createModel({
  state: {
    data: {
      paymentList: {
        data: [],
        total: 0,
      },
      historyList: {
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

    refreshHistoryList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          historyList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadHistoryList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          historyList: {
            data: state.data.historyList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },

    removeHistoryList(state) {
      return {
        ...state,
        data: {
          ...state.data,
          historyList: {
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
      dispatch.payment.loadList(response);
    },
    async clearPaymentList(payload) {
      dispatch.payment.clearList(payload);
    },

    async getRefreshHistoryList(payload) {
      const response = await paymentService.getHistoryList(payload);
      dispatch.payment.refreshHistoryList(response);
    },
    async getLoadHistoryList(payload) {
      const response = await paymentService.getHistoryList(payload);
      dispatch.payment.loadHistoryList(response);
    },
    async clearHistoryList(payload) {
      dispatch.payment.removeHistoryList(payload);
    },
  }),
});
