import { createModel } from '@rematch/core';

import { paymentService } from '@/services';

export const payment = createModel({
  state: {
    data: {
      inList: {
        data: [],
        total: 0,
      },
      outList: {
        data: [],
        total: 0,
      },
      historyList: {
        data: [],
        total: 0,
      },
      topUpList: [],
    },
  },
  reducers: {
    saveTopUp(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          topUpList: payload.data,
        },
      };
    },
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
    inList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          inList: {
            data: state.data.inList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },

    outList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          outList: {
            data: state.data.outList.data.concat(payload.data.rows),
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
          inList: {
            data: [],
            total: 0,
          },
          outList: {
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
    async getTopUpList(payload) {
      const response = await paymentService.getPayTopList(payload);
      dispatch.payment.saveTopUp(response);
      return response;
    },
    async pay(payload) {
      const response = await paymentService.getPayExecute(payload);
      return response;
    },
    async getRefreshList(payload) {
      const response = await paymentService.getPaymentList(payload);
      dispatch.payment.refreshList(response);
    },
    async getLoadList(payload) {
      const response = await paymentService.getPaymentList(payload);
      if (payload.tradeType === 'IN') {
        dispatch.payment.inList(response);
      } else {
        dispatch.payment.outList(response);
      }
    },
    async clearPaymentList(payload) {
      dispatch.payment.clearList(payload);
    },

    async getRefreshHistoryList(payload) {
      const response = await paymentService.getHistoryList(payload);
      dispatch.payment.refreshHistoryList(response);
      return response;
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
