import 'bootstrap';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Validator from 'vue-validator';
Vue.use(VueRouter);
Vue.use(Validator);


const routes = [
// { path: '/', component: require('./components/home/home.vue.html') },
//  { path: '/counter', component: require('./components/counter/counter.vue.html') },
//  { path: '/fetchdata', component: require('./components/fetchdata/fetchdata.vue.html') },
    { path: '/login', component: require('./components/login/login.vue.html')  }
];

new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(require('./components/app/app.vue.html'))
});
