import { createModel } from '@rematch/core';

import { userService } from '@/services';

export const user = createModel({
  state: {
    data: {
      userInfo: {},
      imageIds: [],
      goMoney: {},
    },
  },
  reducers: {
    saveUserInfo(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          userInfo: payload.data ? payload.data : payload,
        },
      };
    },
    saveGoMoney(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          goMoney: payload.data ? payload.data : payload,
        },
      };
    },
    resultImageInfo(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: state.data.imageIds.concat(payload.data.fileId),
        },
      };
    },
    deleteImageInfo(state, payload) {
      state.data.imageIds.splice(payload, 1);
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: state.data.imageIds,
        },
      };
    },
    clearImageInfo(state) {
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: [],
        },
      };
    },
  },
  effects: dispatch => ({
    async getUserInfo(payload) {
      const response = await userService.getUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async getGoMoney(payload) {
      const response = await userService.getGoMoney(payload);
      dispatch.user.saveGoMoney(response);
    },
    async updateUserInfo(payload) {
      const response = await userService.commitUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async requestUpdateImage(payload) {
      const response = await userService.doUpdateImage(payload);
      dispatch.user.resultImageInfo(response);
    },
    async removeImage(payload) {
      dispatch.user.deleteImageInfo(payload);
    },
    async clearImage(payload) {
      dispatch.user.clearImageInfo(payload);
    },
    async requestAddMessage(payload) {
      const response = await userService.doAddMessage(payload);
      return response;
    },
  }),
});
