<template>
  <div class="cart">
    <ul v-if="cartProducts.length" class="list-group">
      <li
        v-for="product in cartProducts"
        class="list-group-item cart-item p-3"
        :key="product.id"
      >
        <img class="cart-item-picture" :src="product.preview" />

        <div class="cart-item-info">
          <p>{{ product.dish }}</p>
          <p class="card-description">{{ product.description }}</p>
          <p class="centered">{{ product.price }} &#x20BD;</p>
          <div>
            <input
              v-if="product.count"
              class="mb-3"
              type="number"
              min="0"
              :value="product.count"
              @change="changeCount(product.id, $event)"
            />
            <button
              class="btn card-button btn-secondary"
              @click="handleCart(product)"
            >
              Удалить из корзины
            </button>
          </div>
        </div>
      </li>
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
export default {
  name: "CartList",
  computed: {
    cartProducts() {
      return this.$store.getters.cartProducts;
    },
    cartSum() {
      return this.$store.getters.cartSum;
    },
  },
  methods: {
    handleCart(product) {
      this.$store.commit("handleCart", {
        ...product,
        count: product.count ? 0 : 1,
      });
    },
    handleOrder() {
      alert(this.cartProducts.map((product) => product.dish));
    },
    changeCount(id, e) {
      this.$store.commit("handleCart", { count: Number(e.target.value), id });
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

.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
