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
      recordList: {
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
      payload.data.task.map(i => {
        if (i.taskScene === 'SHARED_COMMODITY') {
          payload.data.task.splice(payload.data.task.indexOf(i), 1);
        }
      });
      return {
        ...state,
        data: {
          ...state.data,
          taskData: {
            newer: payload.data.newer,
            task: payload.data.task,
          },
        },
      };
    },
    savePointsList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          pointsList: {
            rows: state.data.pointsList.rows.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    refPointsList(state, payload) {
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
    saveRecordList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          recordList: {
            rows: state.data.recordList.rows.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    refRecordList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          recordList: {
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
    async getPointsList(payload) {
      const response = await integralService.flowIn(payload);
      if (payload.page === 1) {
        dispatch.integral.refPointsList(response);
      } else {
        dispatch.integral.savePointsList(response);
      }
      return response;
    },
    async getRecordList(payload) {
      const response = await integralService.flowOut(payload);
      if (payload.page === 1) {
        dispatch.integral.refRecordList(response);
      } else {
        dispatch.integral.saveRecordList(response);
      }
      return response;
    },
  }),
});
