import { createModel } from '@rematch/core';

import { userService } from '@/services';

export const user = createModel({
  state: {
    data: {
      userInfo: {},
      imageInfo:{}
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
    resultImageInfo(state,payload){
      return {
        ...state,
        data: {
          ...state.data,
          imageInfo: payload.data ? payload.data : payload,
        },
      };
    }
   
  },
  effects: dispatch => ({
    async getUserInfo(payload) {
      const response = await userService.getUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async updateUserInfo(payload) {
      const response = await userService.commitUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async requestUpdateImage(payload) {
      const response = await userService.doUpdateImage(payload);
      dispatch.user.resultImageInfo(response);
    },
    async requestAddMessage(payload) {
      const response = await userService.doAddMessage(payload);
      return response;
    },
  }),
});
