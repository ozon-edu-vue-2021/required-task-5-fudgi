<template>
  <li class="card p-3">
    <img class="card-img-top" :src="product.preview" />
    <div class="card-favorite" @click="handleFavorite(product.id)">
      <FavoriteIcon :isActive="product.isFavorite" />
    </div>
    <div class="card-body">
      <p class="card-text price">{{ product.price }} &#x20BD;</p>
      <p class="card-title">{{ product.dish }}</p>
      <p class="card-text">{{ product.description }}</p>

      <div class="mt-auto controls">
        <input
          v-if="product.count"
          class="mb-3"
          type="number"
          min="0"
          :value="product.count"
          @change="changeCartCount(product.id, $event)"
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
</template>

<script>
import FavoriteIcon from "@/components/FavoriteIcon";
import CardMixin from "@/mixins/CardMixin.vue";
import { HANDLE_FAVORITE } from "@/store/mutation-types";

export default {
  name: "ProductList",
  extends: CardMixin,
  components: {
    FavoriteIcon,
  },
  methods: {
    handleFavorite(id) {
      this.$store.commit(HANDLE_FAVORITE, id);
    },
    buttonClasses(count) {
      return ["btn btn-primary card-button", { "btn-secondary": count }];
    },
    buttonText(count) {
      return count ? "Удалить из корзины" : "Добавить в корзину";
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

.controls {
  display: flex;
  flex-direction: column;
}

.card-button {
  max-width: 200px;
}
</style>
