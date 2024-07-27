<template>
  <div class="min-h-screen max-w-full">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>

import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";


export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
