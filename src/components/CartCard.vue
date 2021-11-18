<template>
  <li class="list-group-item cart-item p-3">
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
          @change="changeCartCount(product.id, $event)"
        />
        <button
          class="btn card-button btn-secondary"
          @click="handleCart(product)"
        >
          Удалить
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import CardMixin from "@/mixins/CardMixin.vue";

export default {
  name: "CartCard",
  extends: CardMixin,
};
</script>

<style scoped>
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
