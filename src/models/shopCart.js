import { createModel } from '@rematch/core';

import { shopCartService } from '@/services';

export const shopCart = createModel({
  state: {
    data: {
      shopList: [],
    },
  },
  reducers: {
    saveShopList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          shopList: payload.data,
        },
      };
    },
  },
  effects: dispatch => ({
    async addShop(payload) {
      const response = await shopCartService.addCart(payload);
      return response;
    },
    async shopCartList(payload) {
      const response = await shopCartService.cartList(payload);
      dispatch.shopCart.saveShopList(response);
      return response;
    },
    async delete(payload) {
      const response = await shopCartService.delShop(payload);
      return response;
    },
    async cartPay(payload) {
      const response = await shopCartService.carPay(payload);
      return response;
    },
    async changeCount(payload) {
      const response = await shopCartService.buyCount(payload);
      return response;
    },
  }),
});
