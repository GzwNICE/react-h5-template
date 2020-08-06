import { createModel } from '@rematch/core';

import { userService } from '@/services';

export const user = createModel({
  state: {
    data: {
      userInfo: {},
      imageIds: [],
      goMoney: {},
      aboutUs: {},
      addressList: {
        data: [],
        total: 0,
      },
      resultShowingList: {
        data: [],
        total: 0,
      },
      resultNoShowList: {
        data: [],
        total: 0,
      },
      resultFriendList: {
        data: [],
        total: 0,
      },
      resultRewardList: {
        data: [],
        total: 0,
      },
      resultData: {},
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
    saveGoMoney(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          goMoney: payload.data ? payload.data : payload,
        },
      };
    },
    resultImageInfo(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: state.data.imageIds.concat(payload.data.fileId),
        },
      };
    },
    deleteImageInfo(state, payload) {
      state.data.imageIds.splice(payload, 1);
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: state.data.imageIds,
        },
      };
    },
    clearImageInfo(state) {
      return {
        ...state,
        data: {
          ...state.data,
          imageIds: [],
        },
      };
    },
    resultSaveAddress(state) {
      return {
        ...state,
        data: {
          ...state.data,
        },
      };
    },
    resultAddressList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          addressList: {
            data: payload.data,
            total: payload.data.length,
          },
        },
      };
    },
    doClearAddressList(state) {
      return {
        ...state,
        data: {
          ...state.data,
          addressList: {
            data: [],
            total: 0,
          },
        },
      };
    },
    resultData(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultData: payload.data,
        },
      };
    },
    refreshFriendList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultFriendList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadFriendList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultFriendList: {
            data: state.data.resultFriendList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    refreshRewardList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultRewardList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadRewardList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultRewardList: {
            data: state.data.resultRewardList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    refreshShowingList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultShowingList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadShowingList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultShowingList: {
            data: state.data.resultShowingList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    refreshNoShowList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultNoShowList: {
            data: payload.data.rows,
            total: payload.data.total,
          },
        },
      };
    },
    loadNoShowList(state, payload) {
      return {
        ...state,
        data: {
          ...state.data,
          resultNoShowList: {
            data: state.data.resultNoShowList.data.concat(payload.data.rows),
            total: payload.data.total,
          },
        },
      };
    },
    doClearList(state) {
      return {
        ...state,
        data: {
          ...state.data,
          resultShowingList: {
            data: [],
            total: 0,
          },
          resultNoShowList: {
            data: [],
            total: 0,
          },
          resultFriendList: {
            data: [],
            total: 0,
          },
          resultRewardList: {
            data: [],
            total: 0,
          },
        },
      };
    },
  },
  effects: dispatch => ({
    async getUserInfo(payload) {
      const response = await userService.getUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async getGoMoney(payload) {
      const response = await userService.getGoMoney(payload);
      dispatch.user.saveGoMoney(response);
    },
    async updateUserInfo(payload) {
      const response = await userService.commitUserInfo(payload);
      dispatch.user.saveUserInfo(response);
    },
    async requestUpdateImage(payload) {
      const response = await userService.doUpdateImage(payload);
      dispatch.user.resultImageInfo(response);
      return response;
    },
    async removeImage(payload) {
      dispatch.user.deleteImageInfo(payload);
    },
    async clearImage(payload) {
      dispatch.user.clearImageInfo(payload);
    },
    async submitData(payload) {
      const response = await userService.postData(payload);
      return response;
    },
    async requestSaveAddress(payload) {
      const response = await userService.doSaveAddress(payload);
      dispatch.user.resultSaveAddress(response);
    },
    /**
     * 获取收货地址列表
     */
    async getAddressList() {
      const response = await userService.requestAddressList();
      dispatch.user.resultAddressList(response);
      return response;
    },
    /**
     * 清除收货地址列表
     */
    async clearAddressList() {
      dispatch.user.doClearAddressList();
    },

    async requestHelpCenter(payload) {
      const response = await userService.getHelpCenter(payload);
      return response;
    },
    async requestHelpCenterItem(payload) {
      const response = await userService.getHelpCenterItem(payload);
      return response;
    },
    async requestHelpDetail(payload) {
      const response = await userService.getHelpDetail(payload);
      return response;
    },

    async getAboutUs(params) {
      const response = await userService.requestData(params);
      dispatch.user.resultData(response);
    },
    async getFriendList(params) {
      const response = await userService.requestData(params);
      if (params.isRefresh) {
        dispatch.user.refreshFriendList(response);
      } else {
        dispatch.user.loadFriendList(response);
      }
    },
    async getRewardList(params) {
      const response = await userService.requestData(params);
      if (params.isRefresh) {
        dispatch.user.refreshRewardList(response);
      } else {
        dispatch.user.loadRewardList(response);
      }
    },
    async getShowingList(params) {
      const response = await userService.requestData(params);
      if (params.isRefresh) {
        dispatch.user.refreshShowingList(response);
      } else {
        dispatch.user.loadShowingList(response);
      }
    },
    async getNoShowList(params) {
      const response = await userService.requestData(params);
      if (params.isRefresh) {
        dispatch.user.refreshNoShowList(response);
      } else {
        dispatch.user.loadNoShowList(response);
      }
    },
    async clearList() {
      dispatch.user.doClearList();
    },
    async getData(params) {
      const response = await userService.requestData(params);
      return response;
    },
  }),
});
