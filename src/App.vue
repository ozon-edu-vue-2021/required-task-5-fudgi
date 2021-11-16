<template>
  <div class="wrapper">
    <div class="app">
      <nav class="mb-3">
        <router-link to="/" class="router-link fs-2">Товары</router-link>
        <router-link to="/cart" class="router-link fs-2 mx-3">
          Корзина
          <span class="cart-number" v-if="cartLength">
            {{ cartLength }}
          </span>
        </router-link>
      </nav>

      <div v-if="isLoading">Загрузка...</div>

      <div v-else-if="isError || !products.length">
        <p>Произошла ошибка</p>
        <button @click="loadProducts">Попробуй еще раз</button>
      </div>
      <transition v-else>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
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
    cartLength() {
      return this.$store.getters.cartLength;
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
* {
  box-sizing: border-box;
}

ul {
  padding: 0;
}

.router-link {
  position: relative;
  opacity: 0.6;
  color: inherit;
  text-decoration: none;
}

.router-link-exact-active {
  opacity: 1;
  color: #0d6efd;
}

.cart-number {
  position: absolute;
  top: 0;
  color: white;
  right: -20px;
  font-size: 12px;
  background-color: red;
  width: 20px;
  text-align: center;
  border-radius: 50%;
}

.wrapper {
  display: flex;
  justify-content: center;
  background-color: #e1e1e1;
  min-height: 100vh;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  gap: 1rem;
}

.price {
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: azure;
  padding: 0 6px;
  border-radius: 5px;
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
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
.card-button::after {
  content: "Добавить в корзину";
}
.card-button.btn-secondary::after {
  content: "Удалить из корзины";
}

@media (min-width: 1280px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
