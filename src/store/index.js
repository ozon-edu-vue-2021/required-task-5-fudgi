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
    cartLength(state) {
      return state.products.filter((item) => item.count).length;
    },
    cartProducts(state) {
      return state.products.filter((item) => item.count);
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
      const newProduct = { ...product, count: product.count ? 0 : 1 };
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
            selectedCount: 0,
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
