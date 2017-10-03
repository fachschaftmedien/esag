import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import LazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

Vue.use(Vue2TouchEvents, {
  touchClass: 'touched',
  swipeTolerance: 50
});

Vue.use(LazyLoad, {
  preload: 2,
  loading: './static/img/noscript/loading.png',
  error: './static/img/noscript/error.png',
  attempt: 2
});

new Vue({
  el: '#app',
  render: h => h(App)
});
