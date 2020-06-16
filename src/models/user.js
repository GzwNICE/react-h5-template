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
      console.log('getUserInfo', response);

      dispatch.user.saveUserInfo(response);
    },
    async updateUserInfo(payload) {
      const response = await userService.commitUserInfo(payload);
      console.log('resultUserInfo', response);
      dispatch.user.saveUserInfo(response);
    },
  }),
});
