<template>
  <div class="anime-card card bg-base-100 shadow-xl flex-shrink-0">
    <figure class="card-image">
      <img :src="anime.attributes.posterImage.medium" alt="Anime Poster" class="w-full h-auto rounded-lg"/>
    </figure>
    <div class="card-body p-4">
      <h2 class="card-title text-xl mb-2">{{ anime.attributes.titles.en || 'No Title' }}</h2>
      <p>Total Episodes: {{ anime.attributes.episodeCount || 'Ongoing' }}</p>
      <p>
        Rating:
        <span v-for="(star, index) in stars" :key="index" class="star text-yellow-400 mr-1">
          <font-awesome-icon :icon="star" />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    anime: {
      type: Object,
      required: true,
    },
  },
  computed: {
    stars() {
      const rating = parseFloat(this.anime.attributes.averageRating) || 0;
      const fullStars = Math.floor(rating / 20);
      const halfStars = rating % 20 >= 10 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStars;
      return [
        ...Array(fullStars).fill(['fas', 'star']),
        ...Array(halfStars).fill(['fas', 'star-half-alt']),
        ...Array(emptyStars).fill(['far', 'star']),
      ];
    },
  },
};
</script>

<style scoped>
/* Remove scoped styles as we are using Tailwind CSS */
</style>
