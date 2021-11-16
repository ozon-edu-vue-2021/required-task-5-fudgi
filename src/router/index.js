import Vue from "vue";
import Router from "vue-router";

import ProductList from "@/views/ProductList";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: ProductList },
    { path: "/cart", component: ProductList },
  ],
});
