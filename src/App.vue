<template>
  <div class="wrapper">
    <notifications />
    <div class="app">
      <Navbar />

      <div v-if="isLoading">Загрузка...</div>

      <div v-else-if="isError || !products.length">
        <p>Произошла ошибка</p>
        <button @click="loadProducts">Попробуй еще раз</button>
      </div>

      <transition v-else name="slide-fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
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
* {
  box-sizing: border-box;
}

ul {
  padding: 0;
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
@media (min-width: 1280px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
