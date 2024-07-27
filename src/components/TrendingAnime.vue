<!-- AnimeList.vue -->
<template>
  <div class="anime-list-container">
    <button class="scroll-button left" @click="scrollLeft">
      &#10094; <!-- Unicode for left arrow -->
    </button>
    <div class="anime-list" ref="animeList">
      <ScrollList
        v-for="anime in animeList"
        :key="anime.id"
        :anime="anime"
      />
    </div>
    <button class="scroll-button right" @click="scrollRight">
      &#10095; <!-- Unicode for right arrow -->
    </button>
    <div v-if="animeList.length === 0 && isLoading" class="loading-container">
      <div class="loading-content">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
    <div v-if="animeList.length === 0 && !isLoading">
      <p class="text-center">No Anime Found</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ScrollList from './ScrollList.vue';

export default {
  components: {
    ScrollList,
  },
  data() {
    return {
      animeList: [],
      isLoading: true,
    };
  },
  mounted() {
    this.fetchAnimeList();
  },
  methods: {
    async fetchAnimeList() {
      try {
        const response = await axios.get('https://kitsu.io/api/edge/anime?sort=-averageRating');
        this.animeList = response.data.data;
      } catch (error) {
        console.error('Failed to fetch anime list:', error);
      } finally {
        this.isLoading = false;
      }
    },
    scrollLeft() {
      this.$refs.animeList.scrollBy({ left: -300, behavior: 'smooth' });
    },
    scrollRight() {
      this.$refs.animeList.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
.anime-list-container {
  display: flex;
  align-items: center;
  padding: 16px;
  position: relative;
}

.anime-list {
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  overflow-x: scroll; /* Allows scrolling */
  scroll-behavior: smooth;
  padding: 8px 0;
  flex: 1;
  /* Hide scrollbar for Webkit browsers */
  -ms-overflow-style: none; /* Hide scrollbar for Internet Explorer, Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.anime-list::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Webkit browsers */
}

.scroll-button {
  background-color: #f1f1f1;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 24px;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.scroll-button.left {
  left: 8px;
}

.scroll-button.right {
  right: 8px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px; /* Adjust height as needed */
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
