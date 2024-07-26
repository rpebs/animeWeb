<template>
  <HeroImage />
  <div id="content-section" class="p-4">
    <h1 class="text-4xl font-bold mb-4">Trending List</h1>
    <TrendingAnime />
    <h1 class="text-4xl font-bold mt-4 mb-4">Anime List</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AnimeCard from "../components/AnimeCard.vue";
import TrendingAnime from "../components/TrendingAnime.vue";
import HeroImage from "../components/HeroImage.vue";

export default {
  components: {
    AnimeCard,
    TrendingAnime,
    HeroImage,
  },
  data() {
    return {
      animeList: [],
    };
  },
  created() {
    this.fetchAnimeData();
  },
  methods: {
    async fetchAnimeData() {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page%5Bnumber%5D=1&page%5Bsize%5D=8&sort=-favoritesCount"
        );
        this.animeList = response.data.data;
        console.log(this.animeList); // Periksa struktur data di sini
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
