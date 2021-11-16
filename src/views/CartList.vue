<template>
  <div class="cart">
    <ul v-if="products.length" class="list-group">
      <li
        class="list-group-item cart-item p-3"
        v-for="product in products"
        :key="product.id"
      >
        <img class="cart-item-picture" :src="product.preview" />

        <div class="cart-item-info">
          <p>{{ product.dish }}</p>
          <p>{{ product.description }}</p>
          <p class="centered">{{ product.price }} &#x20BD;</p>
          <button
            class="btn card-button btn-secondary"
            @click="handleCart(product)"
          />
        </div>
      </li>
    </ul>
    <p v-else>Добавьте что-нибудь в корзину</p>
    <div v-if="products.length" class="order p-3">
      <p>
        Сумма заказа: <span class="total-sum">{{ cartSum }} &#x20BD;</span>
      </p>
      <button class="btn btn-success" @click="handleOrder">Оформить</button>
    </div>
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
    cartSum() {
      return this.$store.getters.cartSum;
    },
  },
  methods: {
    handleCart(product) {
      this.$store.commit("handleCart", product);
    },
    handleOrder() {
      alert(this.products.map((product) => product.dish));
    },
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  gap: 20px;
}
.cart-item {
  display: grid;
  align-items: center;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}
.cart-item-picture {
  max-width: 200px;
}

.cart-item-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 20px;
}
.centered {
  text-align: center;
}

.order {
  min-width: 250px;
  height: fit-content;
  background-color: white;
  border-radius: 0.25rem;
}
</style>
