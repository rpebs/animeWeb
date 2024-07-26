<template>
    <div class="relative flex items-center p-4">
      <button class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 border border-gray-300 rounded-full p-2 shadow-md cursor-pointer z-10" @click="scrollLeft">
        &#10094; <!-- Unicode for left arrow -->
      </button>
      <div class="flex overflow-x-auto space-x-4 scrollbar-hidden" ref="animeList">
        <AnimeCard
          v-for="anime in animeList"
          :key="anime.id"
          :anime="anime"
        />
      </div>
      <button class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 border border-gray-300 rounded-full p-2 shadow-md cursor-pointer z-10" @click="scrollRight">
        &#10095; <!-- Unicode for right arrow -->
      </button>
      <div v-if="animeList.length === 0 && isLoading" class="absolute inset-0 flex items-center justify-center">
        <div class="w-10 h-10 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
      <div v-if="animeList.length === 0 && !isLoading" class="text-center">
        <p>No Anime Found</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AnimeCard from './AnimeCard.vue';
  
  export default {
    components: {
      AnimeCard,
    },
    data() {
      return {
        animeList: [],
        isLoading: true,
      };
    },
    async created() {
      this.fetchAnimeList();
    },
    methods: {
      async fetchAnimeList() {
        this.isLoading = true;
        const category = this.$route.params.category;
  
        try {
          const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${encodeURIComponent(category)}`);
          this.animeList = response.data.data;
        } catch (error) {
          console.error('Error fetching anime data:', error);
        } finally {
          this.isLoading = false;
        }
      },
      scrollLeft() {
        this.$refs.animeList.scrollBy({
          left: -300,
          behavior: 'smooth',
        });
      },
      scrollRight() {
        this.$refs.animeList.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Hide scrollbar for Webkit browsers */
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Internet Explorer, Edge */
  .scrollbar-hidden {
    -ms-overflow-style: none;
  }
  
  /* Hide scrollbar for Firefox */
  .scrollbar-hidden {
    scrollbar-width: none;
  }
  </style>
  