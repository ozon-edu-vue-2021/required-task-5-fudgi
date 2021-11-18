<script>
import { HANDLE_CART, CHANGE_CART_COUNT } from "@/store/mutation-types";

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleCart(product) {
      this.$store.commit(HANDLE_CART, product);
    },
    changeCartCount(id, e) {
      this.$store.commit(CHANGE_CART_COUNT, {
        count: Number(e.target.value),
        id,
      });
    },
  },
};
</script>
