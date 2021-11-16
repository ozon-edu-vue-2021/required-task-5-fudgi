<template>
  <div>
    <ul v-if="favorites.length" class="cards">
      <li
        class="card favorite-card p-3"
        v-for="product in favorites"
        :key="product.id"
      >
        <img class="card-img-top" :src="product.preview" />
        <div class="card-body">
          <p class="card-title">{{ product.dish }}</p>
          <p class="card-text">{{ product.description }}</p>
          <p class="centered">{{ product.price }} &#x20BD;</p>
        </div>
        <button class="btn favorite-card-btn" @click="handleFavorite(product)">
          Удалить из избранного
        </button>
      </li>
    </ul>

    <p v-else>Добавьте что-нибудь в избранное</p>
  </div>
</template>

<script>
export default {
  name: "FavoritesList",
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    },
  },
  methods: {
    handleFavorite(product) {
      this.$store.commit("handleFavorite", product);
    },
  },
};
</script>

<style scoped>
.favorite-card,
.favorite-card-btn {
  color: white;
  background-color: #e7024a94;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
