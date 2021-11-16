<template>
  <div class="products">
    <ul v-if="products.length" class="cards">
      <li class="card p-3" v-for="product in products" :key="product.id">
        <img class="card-img-top" :src="product.preview" />
        <p class="card-text price">{{ product.price }} &#x20BD;</p>
        <div class="card-body">
          <p class="card-title">{{ product.dish }}</p>
          <p class="card-text">{{ product.description }}</p>
          <button
            :class="buttonClasses(product.count)"
            @click="handleCart(product)"
          />
        </div>
      </li>
    </ul>
    <p v-else>Добавьте что-нибудь в корзину</p>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
  },
  methods: {
    handleCart(product) {
      this.$store.commit("handleCart", product);
    },
    buttonClasses(count) {
      return [
        "btn btn-primary mt-auto card-button",
        { "btn-secondary": count },
      ];
    },
  },
};
</script>

<style scoped></style>
