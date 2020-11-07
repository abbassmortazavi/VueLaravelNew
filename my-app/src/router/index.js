import Vue from 'vue'
import VueRouter from 'vue-router';
// import Login from '../views/auth/Login';
// import Register from '../views/auth/Register';
import Home from '../views/Home';

Vue.use(VueRouter);

const routes = [
    {
        'path': '/',
        'name': 'home',
        'component': Home 
    },
    {
        'path': '/login',
        'name': 'login',
        'component': ()=> import('../views/auth/Login.vue') 
    },
    {
        'path': '/register',
        'name': 'register',
        'component': ()=> import('../views/auth/Register.vue')  
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;