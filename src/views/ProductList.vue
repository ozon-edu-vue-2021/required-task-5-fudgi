<template>
  <ul class="cards">
    <Card v-for="product in products" :product="product" :key="product.id" />
  </ul>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "ProductList",
  components: {
    Card,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style scoped></style>
