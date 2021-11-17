import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import previews from "@/assets/previews";
import {
  SET_PRODUCTS,
  SET_ERROR,
  SET_LOADING,
  HANDLE_CART,
  CHANGE_CART_COUNT,
  HANDLE_FAVORITE,
} from "./mutation-types";

const CLEAR_COUNT = 0;
const SET_COUNT = 1;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    isLoading: true,
    isError: true,
  },
  getters: {
    cartProducts(state) {
      return state.products.filter((item) => item.count);
    },
    cartLength(_, getters) {
      return getters.cartProducts.length;
    },
    cartSum(_, getters) {
      const sum = getters.cartProducts.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      return sum;
    },
    favorites(state) {
      return state.products.filter((item) => item.isFavorite);
    },
    favoritesLength(_, getters) {
      return getters.favorites.length;
    },
  },
  mutations: {
    [SET_PRODUCTS](state, items) {
      state.products = items;
    },
    [SET_ERROR](state, status) {
      state.isError = status;
    },
    [SET_LOADING](state, status) {
      state.isLoading = status;
    },
    [HANDLE_CART](_, product) {
      const newProduct = {
        ...product,
        count: product.count ? CLEAR_COUNT : SET_COUNT,
      };
      this.commit(CHANGE_CART_COUNT, newProduct);
    },
    [CHANGE_CART_COUNT](state, item) {
      const index = state.products.findIndex(({ id }) => id === item.id);
      const product = state.products[index];
      const newProduct = { ...product, count: item.count };
      Vue.set(state.products, index, newProduct);
    },
    [HANDLE_FAVORITE](state, item) {
      const index = state.products.findIndex(({ id }) => id === item.id);
      const product = state.products[index];
      const newProduct = { ...product, isFavorite: !product.isFavorite };
      Vue.set(state.products, index, newProduct);
    },
  },
  actions: {
    async loadProducts(context) {
      context.commit(SET_LOADING, true);
      context.commit(SET_ERROR, false);

      try {
        const response = await axios.get(
          "https://random-data-api.com/api/food/random_food?size=30"
        );
        const products = response.data.map((item) => {
          const lastIndex = previews.length - 1;
          const previewIndex = Math.round(Math.random() * lastIndex);
          return {
            ...item,
            price: Math.round(Math.random() * 1000),
            preview: previews[previewIndex],
            count: 0,
            isFavorite: false,
          };
        });
        context.commit(SET_PRODUCTS, products);
        context.commit(SET_ERROR, false);
      } catch {
        context.commit(SET_ERROR, true);
      }
      context.commit(SET_LOADING, false);
    },
  },
});
