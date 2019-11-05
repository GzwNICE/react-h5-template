import { createModel } from '@rematch/core';

import { topicService } from '@/services';

export const topic = createModel({
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
      const response = await topicService.query(payload);
      dispatch.topic.save(response);
    },
    async addAsync(payload) {
      await topicService.post(payload);
    },
    async updateAsync(payload) {
      const { id, ...params } = payload;
      await topicService.patch(id, params);
    },
    async deleteAsync(payload) {
      const { id } = payload;
      await topicService.post(id);
    },
  }),
});
