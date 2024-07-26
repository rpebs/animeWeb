<template>
  <div class="anime-card card bg-base-100 shadow-xl">
    <figure class="card-image">
      <img :src="anime.attributes.posterImage.medium" alt="Anime Poster" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ anime.attributes.titles.en || 'No Title' }}</h2>
      <p>Total Episodes: {{ anime.attributes.episodeCount || 'N/A' }}</p>
      <p>
        Rating:
        <span v-for="(star, index) in stars" :key="index" class="star">
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
.anime-card {
  width: 300px; /* Adjust card width */
  flex-shrink: 0; /* Prevent shrinking */
}

.card-image img {
  width: 100%; /* Make image fit card width */
  height: auto; /* Maintain aspect ratio */
  border-radius: 0.5rem; /* Optional: Rounded corners */
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 1.25rem; /* Adjust title font size */
  margin-bottom: 8px;
}

.star {
  color: #f5c518; /* Gold color */
  margin-right: 2px; /* Spacing between stars */
}
</style>
