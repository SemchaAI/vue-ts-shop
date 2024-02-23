<script setup lang="ts">
import BtnPlus from '../icons/btnPlus.vue'
import OutOfStock from '../icons/OutOfStock.vue'
import type { IProductList } from '../productList/product.interface'

const props = defineProps<IProductList>()
const { products, page, total } = props
</script>

<template>
  <li class="product" :key="product._id" v-for="product in products">
    <RouterLink class="productLink" :to="{ name: 'product', params: { id: product._id } }">
      <img class="productImg" width="200px" :src="product.imgLink" :alt="product.title" />
      <h3 class="productTitle">{{ product.title }}</h3>
    </RouterLink>
    <div class="productInfo">
      <div class="productContainer">
        <div class="productPriceLabel">Цена:</div>
        <p class="productPrice">{{ product.price }}</p>
      </div>
      <div class="productControls">
        <button class="productBtnContainer" v-if="product.cnt > 0">
          <BtnPlus />
        </button>
        <div class="outOfStockContainer" v-else>
          <p class="productText">Out of Stock</p>
          <!-- <div class="productBtnContainer"> -->
          <OutOfStock class="productBtnContainer" />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.product {
  width: 300px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: inset 0 0 10px var(--white);

  box-shadow:
    rgba(240, 46, 170, 0.4) 0px 5px,
    rgba(240, 46, 170, 0.3) 0px 10px,
    rgba(240, 46, 170, 0.2) 0px 15px,
    rgba(240, 46, 170, 0.1) 0px 20px,
    rgba(240, 46, 170, 0.05) 0px 25px;

  transition: all 0.3s ease-in-out;
}
.product:hover,
.product:focus {
  box-shadow:
    rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px,
    rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px,
    rgba(240, 46, 170, 0.05) -25px 25px;
}
.productLink {
  display: block;

  text-decoration: none;
  color: var(--black);
}
.productTitle {
  margin-top: 15px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  text-align: justify;
}

.productImg {
  display: block;
  margin: 0 auto;
}

.productInfo {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.productContainer {
}
.productPriceLabel {
  margin-right: 15px;
  color: var(--light-gray);
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  text-transform: uppercase;
}
.productPrice {
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
}
.productControls {
  display: flex;
}
.productBtnContainer {
  width: 40px;
  height: 40px;
}
.outOfStockContainer {
  display: flex;
  gap: 10px;
}
.productText {
  display: flex;
  align-self: center;
  color: var(--negative);
}
</style>
