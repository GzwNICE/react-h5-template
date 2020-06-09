import { createModel } from '@rematch/core';

import { loginService } from '@/services';

export const login = createModel({
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
          userInfo: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async exist(payload) {
      const response = await loginService.userExist(payload);
      return response;
    },
    async login(payload) {
      const response = await loginService.userLogin(payload);
      dispatch.login.saveUserInfo(response);
      return response;
    },
  }),
});
