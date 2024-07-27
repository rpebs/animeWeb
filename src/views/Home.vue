<template>
  <HeroImage />
  <div id="content-section" class="p-4 mb-4">
    <h1 class="text-4xl font-bold mb-4">Trending List</h1>
    <TrendingAnime />
    <h1 class="text-4xl font-bold mt-4 mb-4">Favorite List</h1>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
    window.addEventListener('theme-changed', this.handleThemeChange);
  },
  beforeDestroy() {
    window.removeEventListener('theme-changed', this.handleThemeChange);
  },
  methods: {
    async fetchAnimeData() {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=-favoritesCount"
        );
        this.animeList = response.data.data;
        console.log(this.animeList); // Periksa struktur data di sini
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    },
    handleThemeChange() {
      // This method can be used to force update or refresh HeroImage component
      this.$refs.heroImage.updateBackgroundImage();
    }
  },
};
</script>
