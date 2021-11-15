<template>
  <div id="app">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="isError || !products.length">
      <p>Произошла ошибка</p>
      <button @click="loadProducts">Попробуй еще раз</button>
    </div>
    <ul v-else class="cards">
      <li class="card p-3" v-for="product in products" :key="product.id">
        <p class="card-title">{{ product.dish }}</p>
        <p class="card-text">{{ product.description }}</p>
        <button class="btn btn-primary mt-auto card-button">
          Добавить в корзину
        </button>
      </li>
    </ul>
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

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  gap: 1rem;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-button {
  max-width: 200px;
}

* {
  box-sizing: border-box;
}
</style>
