import { createModel } from '@rematch/core';

import { commentService } from '@/services';

export const comment = createModel({
  state: {
    data: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      current: {},
    },
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          list: payload.map(data => ({
            ...data,
            key: data.id,
          })),
        },
      };
    },
  },
  effects: dispatch => ({
    async fetchAsync(payload) {
      const response = await commentService.query(payload);
      dispatch.comment.save(response);
    },
  }),
});
