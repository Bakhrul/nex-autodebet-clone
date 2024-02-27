export default {
  namespaced: true,
  state: () => ({
    data: {
      imageurl: null,
      merchantaddr: null,
      merchantid: null,
      merchantname: null,
      table: null,
      tableid: null,
      paidtype: null

    },

  }),
  mutations: {
    SET_DATA_MERCHANT(state, payload) {
      state.data.imageurl = payload ? payload.imageurl : null;
      state.data.merchantaddr = payload ? payload.merchantaddr : null;
      state.data.merchantid = payload ? payload.merchantid : null;
      state.data.merchantname = payload ? payload.merchantname : null;
      state.data.table = payload ? payload.table : null;
      state.data.tableid = payload ? payload.tableid : null;
      state.data.paidtype = payload ? payload.paidtype : null;
    },
  },
}
