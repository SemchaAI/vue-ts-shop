<script setup lang="ts">
import { onMounted } from 'vue'
import ChevronLeft from '../icons/ChevronLeft.vue'
import ChevronRight from '../icons/ChevronRight.vue'

type SwiperRef = (HTMLElement & { swiper: Swiper; initialize: () => void }) | null

onMounted(() => {
  const swiperEl: SwiperRef = document.querySelector('.bannerSwiper')

  const params = {
    // injectStyles: [
    //   `.swiper-pagination-bullet {
    //       width: 8px;
    //       height: 8px;
    //       background-color: black;
    //       text-align: center;
    //       line-height: 10px;
    //       font-size: 10px;
    //       color: #000;
    //       opacity: 1;
    //       background: rgba(0, 0, 0, 0.2);
    //     }
    //     `
    // ],
    pagination: {
      el: '.swiper-pagination',
      clickable: true
      // renderBullet: function (index, className) {
      //   return '<span class="' + className + '">' + '</span>'
      // }
    },

    // idk why its doesnt work, implemented version in template
    // navigation: {
    //   nextEl: '.swiper-next',
    //   prevEl: '.swiper-prev'
    // },
    loop: 'true'

    // idk why its doesnt work, in template doesnt work too
    // autoplay: true
  }

  if (swiperEl) {
    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }
})
</script>
<template>
  <div class="wrapper">
    <div class="swiperContainer">
      <swiper-container
        :navigation="{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev'
        }"
        class="bannerSwiper"
      >
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
      <div class="swiper-pagination"></div>
      <button class="swiper-prev swiper-nav">
        <ChevronLeft class="chevron" />
      </button>
      <button class="swiper-next swiper-nav">
        <ChevronRight class="chevron" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swiperContainer {
  margin: 0 50px;
  max-width: 1340px;
  position: relative;
}
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
  left: -45px;
}
.swiper-next {
  right: -45px;
}
.chevron {
}
.left {
}
.right {
}
</style>
