import { createModel } from '@rematch/core';

import { regService } from '@/services';

export const register = createModel({
  state: {
    data: {},
  },
  reducers: {},
  effects: dispatch => ({
    async sendCode(payload) {
      const response = await regService.regSendCode(payload);
      return response;
    },
    async userRegister(payload) {
      const response = await regService.register(payload);
      return response;
    },
    async userResetPsw(payload) {
      const response = await regService.forgetPaw(payload);
      return response;
    },
  }),
});
