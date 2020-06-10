import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    names: [],
    goods: [],
    inCart: [],
  },
  getters: {
    goods: state => state.goods,
    inCart: state => state.inCart,
  },
  mutations: {
    ADD_TO_CART(state, invId) {
      let itemInCart = state.inCart.find(item => item.invId === invId),
          itemInGoods = state.goods.find(item => item.invId === invId);
      if (!itemInCart && !!itemInGoods.P) {
        state.inCart.push({invId, quantity: 1});
        itemInGoods.P--
      } else if (itemInGoods.P) {
        itemInGoods.P--
        itemInCart.quantity++
      }
    },
    REMOVE_FROM_CART(state, index) {
      let id = state.inCart[index].invId,
          qty = state.inCart[index].quantity,
          itemInGoods = state.goods.find(item => item.invId === id);
      state.inCart.splice(index, 1);
      itemInGoods.P += qty;
      },
    SET_NAMES: (state, payload) => {
      state.names = payload;
    },
    SET_DATA: (state, payload) => {
      state.goods = payload;
      state.goods.forEach((G) => {
        G.invId = G.T
        G.name = state.names[G.G].B[G.T].N
        G.catalog = state.names[G.G].G
        G.price = G.C
      })
    },
  },
  actions: {
    GET_NAMES: async (context) => {
      let {data} = await Axios.get('api/names.json');
      context.commit('SET_NAMES', data);
    },
    GET_DATA: async (context) => {
      let {data} = await Axios.get('api/data.json');
      context.commit('SET_DATA', data.Value.Goods);
    },
    addToCart(context, invId) { context.commit('ADD_TO_CART', invId); },
    removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
  }
});
