<template>
    <div>
        <h1>Login</h1>
         <v-container>
            <v-layout row class="text-xs-center">
            <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
                <v-card height="500px"></v-card>
            </v-flex>
            <v-flex xs4 class="grey lighten-4">
                <v-container style="position: relative;top: 13%;" class="text-xs-center">
                <v-card flat>
                    <v-card-title primary-title>
                    <h4>Login</h4>
                    </v-card-title>
                    <v-form ref="loginForm" @submit.prevent="userLogin">
                    <v-text-field name="email" label="email" v-model="loginUser.email"></v-text-field>
                    <v-text-field name="Password" label="Password" type="password" v-model="loginUser.password"></v-text-field>
                    <v-card-actions>
                    <v-btn primary large block type="submit">Login</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
                </v-container>
            </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            loginUser:{
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'user/userLogin'
        }),
        userLogin(){
            this.login(this.loginUser)
            // this.$store.dispatch('user/userLogin' , this.loginUser)
            .then(()=>{
                this.$router.push({name: 'dashboard'});
            });
        }
    },
    created() {
       // console.log(this.$store.state);
    },
}
</script>