import { createModel } from '@rematch/core';
import { homeService } from '@/services';

export const home = createModel({
  state: {
    homeData: {
      name: 'Stephen Curry',
      achievement: 'MVP'
    }
  },
  reducers: {
    changeHomeData(state, payload) {
      console.log(payload);
      return {
        ...state,
        homeData: {
          ...state.homeData,
          achievement: payload,
        },
      };
    },
  },
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
