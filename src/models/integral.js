import { createModel } from '@rematch/core';

import { integralService } from '@/services';

export const integral = createModel({
  state: {
    data: {
      pointData: {},
      taskData: {},
      pointsList: {
        rows: [],
        total: 0,
      },
    },
  },
  reducers: {
    savePoints(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          pointData: payload.data,
        },
      };
    },
    saveTask(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          taskData: payload.data,
        },
      };
    },
    savePintsList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          pointsList: {
            rows: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
  },
  effects: dispatch => ({
    async points(payload) {
      const response = await integralService.myPoints(payload);
      dispatch.integral.savePoints(response);
      return response;
    },
    async task(payload) {
      const response = await integralService.myTask(payload);
      dispatch.integral.saveTask(response);
      return response;
    },
    async exchange(payload) {
      const response = await integralService.changePoint(payload);
      return response;
    },
    async pointsList(payload) {
      const response = await integralService.flowIn(payload);
      dispatch.integral.savePintsList(response);
      return response;
    },
  }),
});
