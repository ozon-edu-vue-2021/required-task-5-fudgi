<template>
  <ul class="cards">
    <li class="card p-3" v-for="product in products" :key="product.id">
      <img class="card-img-top" :src="product.preview" />
      <p class="card-text price">{{ product.price }} &#x20BD;</p>
      <div class="card-favorite" @click="handleFavorite(product)">
        <FavoriteIcon :isActive="product.isFavorite" />
      </div>
      <div class="card-body">
        <p class="card-title">{{ product.dish }}</p>
        <p class="card-text">{{ product.description }}</p>

        <div class="mt-auto">
          <input
            v-if="product.count"
            class="mb-3"
            type="number"
            min="0"
            :value="product.count"
            @change="changeCount(product.id, $event)"
          />
          <button
            :class="buttonClasses(product.count)"
            @click="handleCart(product)"
          >
            {{ buttonText(product.count) }}
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import FavoriteIcon from "@/components/FavoriteIcon";
const CLEAR_COUNT = 0;
const SET_COUNT = 1;

export default {
  name: "ProductList",
  components: {
    FavoriteIcon,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    handleCart(product) {
      this.$store.commit("handleCart", {
        ...product,
        count: product.count ? CLEAR_COUNT : SET_COUNT,
      });
    },
    buttonClasses(count) {
      return ["btn btn-primary card-button", { "btn-secondary": count }];
    },
    buttonText(count) {
      return count ? "Удалить из корзины" : "Добавить в корзину";
    },
    changeCount(id, e) {
      this.$store.commit("handleCart", { count: Number(e.target.value), id });
    },
    handleFavorite(product) {
      this.$store.commit("handleFavorite", product);
    },
  },
};
</script>

<style scoped>
.card-favorite {
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 30px;
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
</style>
