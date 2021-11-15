import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    isLoading: true,
    isError: true,
  },
  getters: {},
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
  },
  actions: {
    async loadProducts(context) {
      context.commit("setLoading", true);
      context.commit("setError", false);

      try {
        const response = await axios.get(
          "https://random-data-api.com/api/food/random_food?size=30"
        );
        context.commit("setProducts", response.data);
        context.commit("setError", false);
      } catch {
        context.commit("setError", true);
      }
      context.commit("setLoading", false);
    },
  },
});
