<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import BtnPlus from '../icons/btnPlus.vue'
import OutOfStock from '../icons/OutOfStock.vue'
import type { IProduct } from '../../models/IProduct'
import { useUserStore } from '@/stores/user'
import FavoriteIcon from '../icons/FavoriteIcon.vue'
import CheckIcon from '../icons/CheckIcon.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import MainBtn from '../buttons/MainBtn.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  list: IProduct | null
}>()
const { list } = props
const url = import.meta.env.VITE_BASE_URL_BD

const cartStore = useCartStore()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const { state } = storeToRefs(userStore)
const favorClass = ref('inactive')

const favorHandler = () => {
  if (list) {
    console.log(list)
    favoriteStore.favoriteHandler(list)
    favorClass.value = favoriteStore.isFavorite(list) ? 'active' : 'inactive'
  }
}

const clickHandler = async () => {
  if (list) {
    await cartStore.addOne(state.value.user.id, list._id)
  }
}
const removeHandler = async () => {
  if (list) {
    await cartStore.deleteOne(state.value.user.id, list._id)
  }
}

onMounted(() => {
  if (list) {
    favorClass.value = favoriteStore.isFavorite(list) ? 'active' : 'inactive'
  }
})
</script>

<template>
  <li v-if="list" class="product">
    <RouterLink class="productLink" :to="{ name: 'product', params: { id: list._id } }">
      <img
        class="productImg"
        width="200px"
        height="200px"
        :src="url + '/' + list.img"
        :alt="list.title"
      />
      <h3 class="productTitle">{{ list.title }}</h3>
    </RouterLink>
    <div class="productInfo">
      <div class="productContainer">
        <div class="productPriceLabel">Цена:</div>
        <p class="productPrice">{{ list.price }}MDL</p>
      </div>
      <div class="productControls">
        <div class="outOfStockContainer" v-if="cartStore.isInCart(list._id)">
          <p class="productText"><CheckIcon /> Добавлен</p>
          <MainBtn class="productBtn" :icon="true" version="outline" @click="removeHandler">
            <CloseIcon width="24" height="24" />
          </MainBtn>
        </div>
        <div class="outOfStockContainer" v-else-if="list.cnt <= 0">
          <p class="productText">Отсутствует</p>
          <!-- <div class="productBtnContainer"> -->
          <OutOfStock class="productBtnContainer" />
          <!-- </div> -->
        </div>
        <div class="productBtnsContainer" v-else>
          <button @click="favorHandler" class="productBtnContainer">
            <FavoriteIcon class="favoriteIcon" :class="favorClass" />
          </button>
          <button @click="clickHandler" class="productBtnContainer">
            <BtnPlus />
          </button>
        </div>
      </div>
    </div>
  </li>
  <li v-else class="product">
    <div class="productLink">
      <div class="skeletonImg skeleton"></div>
      <h3 class="productTitle skeleton"></h3>
    </div>
    <div class="productInfo">
      <div class="productContainer">
        <div class="productPriceLabel skeleton">тест:</div>
        <p class="productPrice skeleton">000000</p>
      </div>
      <div class="productControls">
        <div class="outOfStockContainer skeleton">
          <div class="skeletonBtn skeleton"></div>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.product {
  width: 300px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--tertiary);
  border-radius: 20px;

  box-shadow:
    rgba(187, 134, 252, 0.4) 0px 5px,
    rgba(187, 134, 252, 0.3) 0px 10px,
    rgba(187, 134, 252, 0.2) 0px 15px,
    rgba(187, 134, 252, 0.1) 0px 20px,
    rgba(187, 134, 252, 0.05) 0px 25px;

  transition: all 0.3s ease-in-out;
  &:hover,
  &:focus {
    box-shadow:
      rgba(3, 218, 197, 0.4) -5px 5px,
      rgba(3, 218, 197, 0.3) -10px 10px,
      rgba(3, 218, 197, 0.2) -15px 15px,
      rgba(3, 218, 197, 0.1) -20px 20px,
      rgba(3, 218, 197, 0.05) -25px 25px;
  }
}
.productLink {
  display: block;
  width: 100%;

  text-decoration: none;
  color: var(--surface);
}
.productTitle {
  margin-top: 15px;

  @include smartText(2lh);
  // height: 2lh;
  // overflow: hidden;
  // display: -webkit-box;
  // -webkit-line-clamp: 3;
  // -webkit-box-orient: vertical;
  // text-overflow: ellipsis;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}

.productImg {
  display: block;
  margin: 0 auto;
}

.productInfo {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.productContainer {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
.productBtn {
  display: flex;
}
.productBtnContainer {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.productBtnsContainer {
  display: flex;
  align-items: center;
}
.outOfStockContainer {
  display: flex;
  gap: 10px;
}
.productText {
  display: flex;
  align-self: center;
  color: var(--negative);
  fill: var(--error);
}

/* skeleton */
.skeleton {
  width: 100%;
  background-color: var(--on-white-skeleton);
  color: var(--on-white-skeleton);
  cursor: none;
  border-radius: 20px;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--on-white-skeleton);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}
.skeletonBtn {
  width: 40px;
  height: 40px;
  background-color: var(--on-white-skeleton);
  border-radius: 5px;
}
.skeletonImg {
  width: 240px;
  height: 200px;
  background-color: var(--on-white-skeleton);
  border-radius: 20px;
}

// favorite
.favoriteIcon {
  @include transition;
}
.active {
  fill: var(--favorite);
}
.inactive {
  fill: var(--primary);
}
</style>
