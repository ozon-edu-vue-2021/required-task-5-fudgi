<template>
  <div id="app">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="isError || !products.length">
      <p>Произошла ошибка</p>
      <button @click="loadProducts">Попробуй еще раз</button>
    </div>
    <div v-else>
      Hi
      <ul>
        <li v-for="product in products" :key="product.id">{{ product }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    products() {
      return this.$store.state.products;
    },
    isError() {
      return this.$store.state.isError;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    loadProducts() {
      this.$store.dispatch("loadProducts");
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #e1e1e1;
  padding: 24px;
  border-radius: 20px;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
</style>
