<script lang="ts" setup>
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'
import InnerImageZoom from 'vue-inner-image-zoom'
import { ProductService } from '@/services/product.service'

import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/product'
import type { IProduct } from '@/models/IProduct'
import SearchIcon from '@/components/icons/SearchIcon.vue'
const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const productsStore = useProductsStore()
const url = import.meta.env.VITE_BASE_URL_BD

const isLoading = ref(false)
const product = ref({
  data: {} as IProduct
})
const gallery = computed(() => {
  if (product.value.data.thumbnails) {
    return [product.value.data.img, ...product.value.data.thumbnails.img]
  } else {
    return [product.value.data.img]
  }
})

// const urlHandler = (url: string) => {
//   const thumbnails = product.value.data.thumbnails.img
//   const mainImg = product.value.data.img
//   product.value.data.thumbnails.img = thumbnails.filter((item: string) => {
//     if (item === url) {
//       item = mainImg
//     }
//     return item
//   })
//   product.value.data.img = url
// }

onMounted(async () => {
  product.value = await ProductService.getOne(id)
  // const tmp = await productsStore.getTypes()
  isLoading.value = true
})
</script>

<template>
  <section class="product">
    <div class="wrapper">
      <div v-if="isLoading" class="productContainer">
        <div class="productMain">
          <div class="productMedia">
            <!-- <swiper-container class="bannerSwiper">
              <swiper-slide v-for="thumbnail in product?.data.thumbnails.img" :key="thumbnail">
                <inner-image-zoom
                  :width="150"
                  :height="150"
                  :src="url + '/' + thumbnail"
                  :alt="product.data.title"
                  :hideHint="true"
                />
              </swiper-slide>
            </swiper-container> -->
            <swiper-container
              class="productSwiper2"
              space-between="0"
              slides-per-view="3"
              free-mode="true"
              watch-slides-progress="true"
              direction="vertical"
            >
              <swiper-slide
                class="productSwiperSlide"
                v-for="thumbnail in gallery"
                :key="thumbnail"
              >
                <img
                  class="productSwiperSlideImg2"
                  width="150"
                  height="150"
                  :src="url + '/' + thumbnail"
                  :alt="product.data.title"
                />
              </swiper-slide>
            </swiper-container>
            <swiper-container
              class="productSwiper"
              thumbs-swiper=".productSwiper2"
              navigation="true"
            >
              <swiper-slide v-for="thumbnail in gallery" :key="thumbnail">
                <div class="productImgContainer">
                  <inner-image-zoom
                    :width="450"
                    :height="450"
                    class="productImg"
                    :src="url + '/' + thumbnail"
                    :alt="product.data.title"
                    :hideHint="true"
                  />
                  <SearchIcon width="24" height="24" class="productImgHintIcon" />
                </div>
                <!-- <img
                  width="450px"
                  height="450px"
                  :src="url + '/' + thumbnail"
                  :alt="product.data.title"
                /> -->
              </swiper-slide>
            </swiper-container>

            <!-- <div class="productImgContainer">
              <inner-image-zoom
                :width="450"
                :height="450"
                class="productImg"
                :src="url + '/' + product.data.img"
                :alt="product.data.title"
                :hideHint="true"
              />
              <SearchIcon width="24" height="24" class="productImgHintIcon" />
            </div> -->
          </div>
          <div class="productColumn">
            <h1 class="productTitle">{{ product?.data.title }}</h1>
            <p class="productDescription">{{ product?.data.description }}</p>
            <div class="productInfo">
              <p class="productPrice">
                <span class="productInfoLabel">Цена:</span>{{ product?.data.price }}<span>MDL</span>
              </p>
              <p class="productCount">
                <span class="productInfoLabel">В наличии:</span>{{ product?.data.cnt
                }}<span>шт.</span>
              </p>
            </div>
          </div>
        </div>
        <div class="productSecond" v-if="product.data.info.length > 0">
          <h2 class="productCharTitle">Характеристики</h2>
          <div class="productCharacteristics">
            <div
              :key="information._id"
              v-for="information in product?.data.info"
              class="productCharacteristic"
            >
              <h2 class="productInfoTitle">{{ information.title }}</h2>
              <p class="productInfoText">{{ information.description }}</p>
            </div>
          </div>
        </div>
        <div v-else class="productCharTitle">Характеристик нет</div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product {
  margin-top: 40px;
  color: var(--tertiary);
}
.productContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.productMain {
  display: flex;
  gap: 20px;
}
.productImgContainer {
  width: 450px;
  height: 450px;
  border-radius: 8px;
  // border: 1px solid var(--primary);
  position: relative;
  background-color: var(--tertiary);
}
.productImg {
  border-radius: 8px;
}
.productImgHintIcon {
  position: absolute;
  right: 20px;
  bottom: 20px;

  fill: var(--primary);
}

.productColumn {
}
.productTitle {
  color: var(--primary);
  @include headline3Typo;
}
.productDescription {
  margin-top: 20px;

  @include body2Typo();
}
.productInfo {
  margin-top: 20px;
}
.productPrice {
}
.productInfoLabel {
  margin-right: 10px;
  color: var(--primary-focused);
}
.productCount {
}
.productSecond {
  margin-top: 20px;
}
.productCharacteristics {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  border-radius: 15px;

  background-color: var(--background-soft);
}
.productCharTitle {
  @include headline4Typo;
  color: var(--primary);
}
.productCharacteristic {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--disabled);
}
.productInfoTitle {
  @include body1Typo;
  color: var(--primary);
}
.productInfoText {
}

//Product
.productMedia {
  display: flex;
  width: 620px;
  gap: 20px;
  background-color: var(--background);
}
.productSwiper {
  margin: 0;
  max-width: 450px;
  position: relative;
  border-radius: 8px;

  background-color: var(--tertiary);
}

.productSwiper2 {
  margin: 0;
  max-width: 150px;
  max-height: 450px;
  position: relative;

  border-radius: 8px;

  background-color: var(--tertiary);
}
.productSwiperSlide2 {
  max-width: 150px;
  max-height: 150px;
}
.productSwiperSlideImg2 {
  border-radius: 8px;
}
</style>
