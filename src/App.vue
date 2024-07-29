<template>
  <div class="h-screen max-w-full">
    <Navbar />
    <div class="mb-auto">
    <router-view />
  </div>
  
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
