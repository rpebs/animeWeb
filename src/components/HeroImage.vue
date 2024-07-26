<template>
    <div>
      <div
        id="hero-section"
        class="hero"
        style="
          background-image: url(https://img.freepik.com/free-photo/anime-style-mythical-dragon-creature_23-2151112768.jpg?t=st=1721975678~exp=1721979278~hmac=d4f9254604f504087dc2bd5808e1d419c1542301d7be942c122bd0fa59f8f75e&w=1380);
          min-height: 500px;
        "
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-neutral-content text-center">
          <div class="max-w-md">
            <h1 class="mb-5 text-4xl font-bold">Selamat Datang Di Rpebs Anime DB</h1>
            <p class="mb-5">
              Tempat anda melihat segala informasi mengenai anime yang ada saat ini!
            </p>
            <button class="btn btn-active btn-neutral" @click="scrollToContent">
              Go There!
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
      scrollToContent() {
        const contentSection = document.getElementById('content-section');
        contentSection.scrollIntoView({ behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan gaya khusus jika diperlukan */
  </style>
  