<template>
  <div class="products">
    <ul class="cards">
      <li class="card p-3" v-for="product in products" :key="product.id">
        <img class="card-img-top" :src="product.preview" />
        <p class="card-text price">{{ product.price }} &#x20BD;</p>
        <div class="card-body">
          <p class="card-title">{{ product.dish }}</p>
          <p class="card-text">{{ product.description }}</p>
          <button
            class="btn btn-primary mt-auto card-button"
            @click="handleCart(product, $event)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    products() {
      return this.$store.state.products.products;
    },
  },
  methods: {
    handleCart(product, e) {
      this.$store.commit("handleCart", product);
      e.currentTarget.classList.toggle("btn-secondary");
    },
  },
};
</script>

<style>
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
