<template>
    <div v-if="!isLoading">
        <div class="hero h-80 bg-cover bg-center mb-4"
            :style="{ backgroundImage: `url(${anime.attributes.coverImage.original})` }">
            <div class="hero-overlay bg-opacity-60"></div>
        </div>
        <div class="container p-4 mx-auto w-full mt-4">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="relative lg:col-span-1 lg:-mt-28 lg:z-10 text-center">
                    <img :src="anime.attributes.posterImage.original" alt="Anime Poster"
                        class="w-full rounded-lg shadow-xl mb-4 object-cover h-80 lg:w-60 mx-auto" />
                    <button class="btn btn-outline btn-info lg:mt-3" @click="watchTrailer"><font-awesome-icon
                            :icon="['fas', 'play']" />
                        <span>Watch Trailer</span></button>
                </div>
                <div class="lg:col-span-2 mt-12 lg:mt-0">
                    <h1 class="text-3xl font-bold">{{ anime.attributes.titles.en || 'No Title' }} ({{ new
                        Date(anime.attributes.startDate).getFullYear() }})</h1>
                    <p class="text-lg mb-1">{{ anime.attributes.titles.ja_jp }}</p>
                    <p class="text-lg mb-4">Rating: {{ anime.attributes.averageRating || 'N/A' }}</p>
                    <p class="text-lg mb-4">{{ anime.attributes.synopsis }}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        <ul>
                            <li>Type: {{ anime.attributes.showType }}</li>
                            <li>Status: {{ anime.attributes.status }}</li>
                            <li>Episodes: {{ anime.attributes.episodeCount || 'Ongoing' }}</li>
                            <li>Duration: {{ anime.attributes.episodeLength }} min</li>
                        </ul>
                        <ul>
                            <li>Genres: {{ genres }}</li>
                            <li>Age Rating: {{ anime.attributes.ageRatingGuide }}</li>
                            <li>Language: {{ anime.attributes.language || 'N/A' }}</li>
                            <li>Released: {{ new Date(anime.attributes.startDate).toLocaleDateString() }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
        <svg class="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Zm8-6a6 6 0 0 0-5.14 9.14A6.002 6.002 0 0 1 12 6Z"></path>
        </svg>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            anime: null,
            isLoading: true,
            genres: '',
        };
    },
    mounted() {
        this.fetchAnime();
    },
    methods: {
        async fetchAnime() {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const slug = this.$route.params.slug;
            try {
                const response = await axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}`);
                if (response.data.data.length > 0) {
                    this.anime = response.data.data[0];
                    const genresUrl = this.anime.relationships.genres.links.related;
                    this.fetchGenres(genresUrl);
                } else {
                    console.error('Anime not found');
                }
            } catch (error) {
                console.error('Failed to fetch anime:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchGenres(genresUrl) {
            try {
                const genresResponse = await axios.get(genresUrl);
                this.genres = genresResponse.data.data.map(genre => genre.attributes.name).join(', ');
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        },
        watchTrailer() {
            const trailerUrl = this.anime.attributes.youtubeVideoId ? `https://www.youtube.com/watch?v=${this.anime.attributes.youtubeVideoId}` : '#';
            if (trailerUrl !== '#') {
                window.open(trailerUrl, '_blank');
            } else {
                alert('Trailer not available.');
            }
        }
    },
};
</script>

<style scoped>
.hero {
    position: relative;
}
</style>
