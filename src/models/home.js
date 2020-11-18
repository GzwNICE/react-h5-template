import { createModel } from '@rematch/core';
import { homeService } from '@/services';

export const home = createModel({
  state: {},
  reducers: {},
  effects: dispatch => ({
    async login(payload) {
      const response = await homeService.userLogin(payload);
      return response;
    },
    async userRegister(payload) {
      const response = await homeService.register(payload);
      return response;
    },
  }),
});
