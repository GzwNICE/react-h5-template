import { createModel } from '@rematch/core';

import { orderService } from '@/services';

export const order = createModel({
  state: {
    data: {
      orderList: [],
    },
  },
  reducers: {
    saveOrderList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          orderList: payload.data
            ? payload.data
            : [
                {
                  imgUrl:
                    'http://f.winmybonus.com/businessRecord/JBLPulse4/pic1.png?x-oss-process=image/resize,w_600,h_600',
                  remainingCount: 4,
                  progress: 70,
                },
              ],
        },
      };
    },
  },
  effects: dispatch => ({
    async getOrderList(payload) {
      const response = await orderService.getOrderList(payload);
      console.log("result",response)
      dispatch.order.saveOrderList(response);
    },
  }),
});
