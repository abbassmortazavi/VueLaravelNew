import Axios from "axios";

const state = {
    isLoggedIn: false,
    userDetails: {}
};

const getters = {
    loggedIn(state) {
        return state.isLoggedIn;
    }
};

const mutations = {
    setloggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    userLogin(ctx, payload) {
        return new Promise((reject, resolve) => { 
            Axios.post('http://localhost:8000/api/login' , payload)
                .then((res) => {
                    localStorage.setItem('token', res.data);
                    ctx.commit('setloggedIn', true);
                    this.$router.push({name: 'dashboard'});
                resolve(res.data);
            }).catch((error)=>{
                // console.log(error);
                reject(error);
            });
        });
    },
    userLogout(ctx){
        return new Promise((resolve)=>{
            localStorage.removeItem('token');
            ctx.commit('setloggedIn' , false);
            resolve(true);
        })
    },
    setLoggedInState(ctx){
        return new Promise((resolve)=>{
            if (localStorage.getItem('token')){
                ctx.commit('loggedIn' , true);
                resolve(true);
            }else {
                ctx.commit('loggedIn' , false);
                resolve(false);
            }
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}