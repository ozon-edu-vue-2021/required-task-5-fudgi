import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import previews from "@/assets/previews";

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
    setProducts(state, items) {
      state.products = items;
    },
    setError(state, status) {
      state.isError = status;
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    handleCart(state, item) {
      const index = state.products.findIndex(({ id }) => id === item.id);
      const product = state.products[index];
      const newProduct = { ...product, count: item.count };
      Vue.set(state.products, index, newProduct);
    },
    handleFavorite(state, item) {
      const index = state.products.findIndex(({ id }) => id === item.id);
      const product = state.products[index];
      const newProduct = { ...product, isFavorite: !product.isFavorite };
      Vue.set(state.products, index, newProduct);
    },
  },
  actions: {
    async loadProducts(context) {
      context.commit("setLoading", true);
      context.commit("setError", false);

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
        context.commit("setProducts", products);
        context.commit("setError", false);
      } catch {
        context.commit("setError", true);
      }
      context.commit("setLoading", false);
    },
  },
});
