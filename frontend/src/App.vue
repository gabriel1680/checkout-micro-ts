<script setup lang="ts">
  import { inject, onMounted, reactive, ref } from 'vue';

  import { Order } from "./domain/Order";
  import { Product } from "./domain/Product";
  import { CheckoutGateway } from "./application/CheckoutGateway";

  const products: Product[] = reactive([]);
  const order = reactive(new Order("582.407.930-70"));
  const message = ref("");
  const checkoutGateway = inject("CheckoutGateway") as CheckoutGateway;

  function formatBRL(number: number) {
    return number.toLocaleString("pt-BR", { currency: "BRL", style: "currency" })
  }

  function getProductById(id: number) {
    return products.find(p => p.id === id);
  }

  async function confirm(order: Order) {
    const { code } = await checkoutGateway.checkout(order);
    order.code = code;
    message.value = "success";
  }

  onMounted(async () => {
    const response = await checkoutGateway.getProducts();
    products.push(...response);
  });
</script>

<template>
  <div class="title">Checkout</div>
  <div v-for="product in products">
      <span class="product-description">{{ product.description }}</span>
      <span class="product-price">{{ formatBRL(product.price) }}</span>
      <button class="product-add-button" @click="order.addItem(product)">add</button>
  </div>
  <div class="items">Items</div>
  <div v-for="item in order.items">
    <span class="item-description">{{ getProductById(item.id)?.description }}</span>
    <span class="item-quantity">{{ item.quantity }}</span>
    <button class="item-increase-button" @click="order.increaseItem(item.id)">+</button>
    <button class="item-decrease-button" @click="order.decreaseItem(item.id)">-</button>
  </div>
  <div class="total">Total: {{ formatBRL(order.getTotal()) }}</div>
  <button class="confirm" @click="confirm(order)">confirm</button>
  <div class="message">{{ message }}</div>
  <div class="order-code">{{ order.code }}</div>
</template>

<style scoped>
  .title {
    margin: 10px 0;
    font-weight: bold;
  }
  .items {
    margin: 10px 0;
    font-weight: bold;
  }
  .product-add-button, .item-increase-button {
    margin-left: 5px;
  }
  .product-description, .item-description {
    margin-right: 5px;
  }
  .total {
    margin: 10px 0px;
    font-weight: bold;
  }
  .confirm {
    margin: 10px 0px;
  }
</style>
