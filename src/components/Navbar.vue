<template>
  <nav class="mb-3 nav">
    <router-link to="/" class="router-link fs-2">Товары</router-link>
    <router-link to="/cart" class="link router-link fs-2">
      Корзина
      <span class="count" v-if="cartLength"> {{ cartLength }} </span>
    </router-link>
    <router-link to="/favorites" class="link router-link fs-2">
      Избранное
      <span class="count" v-if="favoritesLength">
        {{ favoritesLength }}
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  computed: {
    cartLength() {
      return this.$store.getters.cartLength;
    },
    favoritesLength() {
      return this.$store.getters.favoritesLength;
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
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

.link {
  margin-left: 2rem;
}

.count {
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
</style>
