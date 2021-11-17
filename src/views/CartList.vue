<template>
  <div class="cart">
    <ul v-if="cartProducts.length" class="list-group">
      <CartCard
        v-for="product in cartProducts"
        :product="product"
        :key="product.id"
      />
    </ul>

    <p v-else>Добавьте что-нибудь в корзину</p>

    <div v-if="cartProducts.length" class="order p-3">
      <p>
        Сумма заказа: <span class="total-sum">{{ cartSum }} &#x20BD;</span>
      </p>
      <button class="btn btn-success" @click="handleOrder">Оформить</button>
    </div>
  </div>
</template>

<script>
import CartCard from "@/components/CartCard";

export default {
  name: "CartList",
  components: {
    CartCard,
  },
  computed: {
    cartProducts() {
      return this.$store.getters.cartProducts;
    },
    cartSum() {
      return this.$store.getters.cartSum;
    },
  },
  methods: {
    handleOrder() {
      alert(this.cartProducts.map((product) => product.dish));
    },
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  gap: 20px;
}

.order {
  min-width: 250px;
  height: fit-content;
  background-color: white;
  border-radius: 0.25rem;
}
</style>
