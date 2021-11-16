import Vue from "vue";
import Router from "vue-router";

import ProductList from "@/views/ProductList";
import CartList from "@/views/CartList";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: ProductList },
    { path: "/cart", component: CartList },
  ],
});
