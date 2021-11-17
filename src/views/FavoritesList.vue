<template>
  <div>
    <ul v-if="favorites.length" class="cards">
      <Card v-for="product in favorites" :product="product" :key="product.id" />
    </ul>

    <p v-else>Добавьте что-нибудь в избранное</p>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "FavoritesList",
  components: {
    Card,
  },
  computed: {
    favorites() {
      return this.$store.getters.favorites;
    },
  },
};
</script>

<style scoped></style>
