import { createModel } from '@rematch/core';

import { userService } from '@/services';

export const user = createModel({
  state: {
    data: {
      userInfo: {},
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
      console.log("requestImage",payload)

      const response = await userService.doUpdateImage(payload);
      console.log("responseImage",response)
      dispatch.user.resultImageInfo(response);
    },
  }),
});
