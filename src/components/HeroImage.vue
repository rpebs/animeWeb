<template>
  <div
    id="hero-section"
    class="hero"
    :style="{ backgroundImage: `url(${backgroundImage})`, minHeight: '500px' }"
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="max-w-md">
        <h1 class="mb-5 text-4xl font-bold">Selamat Datang Di Rpebs Anime DB</h1>
        <p class="mb-5">
          Tempat anda melihat segala informasi mengenai anime yang ada saat ini!
        </p>
        <button class="btn btn-active btn-neutral" @click="scrollToContent">
          <font-awesome-icon icon="fa-regular fa-circle-down" />
          Go There!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import { ref, onMounted, onUnmounted, computed } from 'vue';

export default {
  setup() {
    const backgroundImage = ref('');

    const updateBackgroundImage = () => {
      const theme = localStorage.getItem('theme') || 'light';
      backgroundImage.value = theme === 'dark'
        ? '/src/assets/img/banner-dark.avif'
        : '/src/assets/img/banner-light.png';
    };

    onMounted(() => {
      updateBackgroundImage();
      EventBus.on('theme-changed', updateBackgroundImage);
    });

    onUnmounted(() => {
      EventBus.off('theme-changed', updateBackgroundImage);
    });

    const scrollToContent = () => {
      const contentSection = document.getElementById('content-section');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return {
      backgroundImage: computed(() => backgroundImage.value),
      scrollToContent,
    };
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Overlay color */
}
.hero-content {
  position: relative;
  z-index: 1;
}
</style>
