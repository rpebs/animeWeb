import { createApp } from 'vue'

// import './style.css'
import './assets/talwind.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faPlay as fasPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';


library.add(fasStar, faStarHalfAlt, farStar, faCircleDown, fasPlay);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router).mount('#app')



