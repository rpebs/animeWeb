<template>
  <div class="px-4 mx-auto">
    <div
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-4"
    >
      <div
        class="card bg-base-100 shadow-xl"
        v-for="item in news"
        :key="item.title"
      >
        <figure>
          <img :src="getImageUrl(item.field_image)" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ item.title }}</h2>
          <p></p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Baca Berita</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      news: [],
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get(
          "https://brantas-abipraya.co.id/id/v1/api/news?_format=json"
        );
        this.news = response.data;
      } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error("Failed to fetch news");
      }
    },
    getImageUrl(imagePath) {
      return `https://www.brantas-abipraya.co.id/${imagePath}`;
    },
  },
};
</script>
