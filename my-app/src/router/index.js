import Vue from 'vue'
import VueRouter from 'vue-router';
// import Login from '../views/auth/Login';
// import Register from '../views/auth/Register';
import Home from '../views/Home';
import Middlewares from '../middlwares';


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
        'component': () => import('../views/auth/Login.vue'),
        meta: {
            middleware: [Middlewares.geust]
        }
        
    },
    {
        'path': '/register',
        'name': 'register',
        'component': () => import('../views/auth/Register.vue'),
        meta: {
            middleware: [Middlewares.geust]
        }
    },
    {
        'path': '/dashboard',
        'name': 'dashboard',
        'component': () => import('../views/pages/Dashboard.vue'),
        meta: {
            middleware: [Middlewares.auth]
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});



router.beforeEach((to, from, next) => {
   if (to.meta.middleware) {
       const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
       const ctx = {
           from,
           next,
           router,
           to
       }
       const nextMiddleware = nextCheck( ctx, middleware );
 
       return middleware[0]({ ...ctx, next: nextMiddleware });
    }
    return next(); 
});

function nextCheck(context, middleware, index) {
    
    const nextMiddleware = middleware[index];
    if (!nextMiddleware) {
        return context.next;
    }
    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index + 1);

        nextMiddleware({ ...context, next: nextMidd });
    }
}

export default router;