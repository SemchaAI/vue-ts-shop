<script setup lang="ts">
import { onMounted } from 'vue'
import ChevronLeft from '../icons/ChevronLeft.vue'
import ChevronRight from '../icons/ChevronRight.vue'

// doesn't work , idk why
const customStyles: string[] = [
  `.swiper-custom-bullet {
  width: 14px;
  height: 14px;
  border: 2px solid var(--secondary);
  border-radius: 50%;
  background-color: var(--primary);
  cursor: pointer;
}`
]

onMounted(() => {
  const swiperEl = document.querySelector('swiper-container')

  const params = {
    injectStyles: customStyles,
    pagination: {
      el: '.pagination',
      bulletClass: 'swiper-custom-bullet',
      bulletActiveClass: 'swiper-custom-bullet-active',
      clickable: true,

      renderBullet: function (index: number, className: string) {
        return '<span class="' + className + '">' + '</span>'
      }
    },

    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev'
    },
    loop: 'true'

    // autoplay: {
    //   delay: 3000
    // }
  }

  Object.assign(swiperEl, params)
  swiperEl.initialize()
})
</script>
<template>
  <div class="swiper">
    <div class="wrapper">
      <div class="swiperContainer">
        <swiper-container :init="false" class="bannerSwiper">
          <swiper-slide>
            <RouterLink :to="{ name: 'home' }">
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </RouterLink>
          </swiper-slide>
          <swiper-slide>
            <RouterLink :to="{ name: 'home' }">
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </RouterLink>
          </swiper-slide>
          <swiper-slide>
            <RouterLink :to="{ name: 'home' }">
              <picture
                ><source
                  media="(min-width: 1024px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-desktop-T6ATY0.webp" />
                <source
                  media="(min-width: 768px)"
                  srcset="https://api.mi.md/media/carousels/Xiaomi_14_mi-tablet-HW9MPO.webp" />
                <img
                  src="https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp"
                  width="1340"
                  height="560"
                  loading="lazy"
                  sizes="sm:100vw md:50vw lg:400px"
                  srcset="
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 640w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 384w,
                    https://api.mi.md/media/carousels/Xiaomi_14_mi-mobile-IXIYFW.webp 400w
                  "
              /></picture>
            </RouterLink>
          </swiper-slide>
        </swiper-container>
        <div class="pagination"></div>
        <button class="swiper-prev swiper-nav">
          <ChevronLeft class="chevron" />
        </button>
        <button class="swiper-next swiper-nav">
          <ChevronRight class="chevron" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiperContainer {
  margin: 10px 0;
  max-width: 1340px;
  position: relative;
}
// NAVIGATION
.swiper-nav {
  position: absolute;
  width: 40px;
  height: 40px;

  top: calc(50% - 20px);

  fill: var(--primary);

  @include transition;

  &:hover,
  &:focus {
    fill: var(--secondary);
  }
  &.swiper-nav-disabled {
    fill: var(--secondary);
  }
}
.swiper-prev {
  left: 0px;
  z-index: var(--bannerBtns);
}
.swiper-next {
  right: 0px;
  z-index: var(--bannerBtns);
}
.chevron {
}
.left {
}
.right {
}
// PAGINATION
.pagination {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  gap: 4px;
  z-index: var(--bannerBtns);

  width: 100%;
  position: absolute;
  bottom: 0;
}
.swiper-pagination-bullet2 {
  width: 8px;
  height: 8px;
  background-color: black;
  text-align: center;
  line-height: 10px;
  font-size: 10px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
</style>
