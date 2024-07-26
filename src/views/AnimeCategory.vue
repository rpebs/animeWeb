<template>
  <div class="container mx-auto px-4 mt-4">
    <h1 class="text-2xl font-bold mb-4">{{ categoryName }} Anime</h1>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <!-- Spinner loading -->
      <svg
        class="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Zm8-6a6 6 0 0 0-5.14 9.14A6.002 6.002 0 0 1 12 6Z"
        ></path>
      </svg>
    </div>
    <div v-if="!isLoading && animeList.length === 0" class="text-center mt-4">
      <p>No Anime Found</p>
    </div>
    <div v-if="!isLoading && animeList.length > 0">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full mx-auto"
      >
        <AnimeCard v-for="anime in animeList" :key="anime.id" :anime="anime" />
      </div>
      <div class="mt-4 text-center">
        <div class="join">
          <button
            v-if="paginationLinks.prev"
            @click="fetchAnimeData(paginationLinks.prev)"
            class="join-item btn"
          >
            «
          </button>
          <button class="join-item btn">
            Page {{ currentPage }} of {{ totalPages }}
          </button>
          <button
            v-if="paginationLinks.next"
            @click="fetchAnimeData(paginationLinks.next)"
            class="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AnimeCard from "../components/AnimeCard.vue";

export default {
  components: {
    AnimeCard,
  },
  data() {
    return {
      animeList: [],
      isLoading: true,
      categoryName: "",
      paginationLinks: {},
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    async fetchAnimeData(url = "") {
      const category = this.$route.params.category;
      this.categoryName = category.charAt(0).toUpperCase() + category.slice(1);

      // Build URL if not provided
      if (!url) {
        url = `https://kitsu.io/api/edge/anime?filter[categories]=${category}&page[number]=${this.currentPage}&page[size]=12`;
      }

      this.isLoading = true;
      try {
        const response = await axios.get(url);

        // Process data and links
        this.animeList = response.data.data;
        this.paginationLinks = response.data.links;

        // Extract and validate pagination information
        this.currentPage = this.extractPageNumber(url);
        this.totalPages = this.extractTotalPages(this.paginationLinks.last);
      } catch (error) {
        console.error("Failed to fetch anime by category:", error);
      } finally {
        this.isLoading = false;
      }
    },
    extractPageNumber(url) {
      try {
        if (!url) return 1;

        // Ensure the URL is valid
        const urlObj = new URL(url, "https://kitsu.io"); // Provide a base URL to handle relative URLs
        const urlParams = new URLSearchParams(urlObj.search);
        return parseInt(urlParams.get("page[number]")) || 1;
      } catch (error) {
        console.error("Error extracting page number:", error);
        return 1; // Default to 1 in case of error
      }
    },
    extractTotalPages(lastPageUrl) {
      try {
        if (lastPageUrl) {
          // Ensure lastPageUrl is valid
          const lastPageUrlObj = new URL(lastPageUrl);
          const lastPageParams = new URLSearchParams(lastPageUrlObj.search);
          return parseInt(lastPageParams.get("page[number]")) || 1;
        }
        return 1; // Default to 1 if no lastPageUrl
      } catch (error) {
        console.error("Error extracting total pages:", error);
        return 1;
      }
    },
  },
  watch: {
    "$route.params.category": function (newCategory) {
      // Reset currentPage to 1 when category changes
      this.currentPage = 1;
      this.fetchAnimeData(); // Fetch new data based on the new category
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
