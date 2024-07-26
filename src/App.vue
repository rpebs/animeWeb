<template>
  <div class="max-w-full">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

import Navbar from "./components/Navbar.vue";


export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
