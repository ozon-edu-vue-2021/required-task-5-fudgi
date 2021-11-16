import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import previews from "@/assets/previews";

Vue.use(Vuex);

const ProductsModule = {
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
        const products = response.data.map((item) => {
          const previewIndex = Math.round(
            Math.random() * (previews.length - 1)
          );
          return {
            ...item,
            price: Math.round(Math.random() * 1000),
            preview: previews[previewIndex],
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
};

const CartModule = {
  state: {
    cartList: [],
  },
  getters: {},
  mutations: {
    handleCart(state, item) {
      const index = state.cartList.findIndex(({ id }) => id === item.id);
      if (index !== -1) state.cartList.splice(index, 1);
      else state.cartList.push(item);
    },
  },
};

export default new Vuex.Store({
  modules: {
    products: ProductsModule,
    cart: CartModule,
  },
});
