import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import IMC from '@/components/IMC';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/imc', name: 'IMC', component: IMC },
  ],
});
