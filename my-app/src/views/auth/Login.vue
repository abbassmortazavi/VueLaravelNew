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
                    <v-form ref="loginForm">
                    <v-text-field name="email" label="email" v-model="loginUser.email"></v-text-field>
                    <v-text-field name="Password" label="Password" type="password" v-model="loginUser.password"></v-text-field>
                    <v-card-actions>
                    <v-btn primary large block @click="userLogin">Login</v-btn>
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
import Axios from 'axios';


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
        userLogin(){
            Axios.post('http://localhost:8000/api/login' , this.loginUser)
            .then((res)=>{
                console.log(res);
                localStorage.setItem('token',res.data);
               this.$router.push('/dashboard');
            }).catch((error)=>{
                console.log(error);
            })
            //console.log(this.loginUser);
        }
    },
}
</script>