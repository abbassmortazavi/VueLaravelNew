<template>
    <div>
        <v-container>
            <v-layout row class="text-xs-center">
            <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
                <v-card height="500px"></v-card>
            </v-flex>
            <v-flex xs4 class="grey lighten-4">
                <v-container style="position: relative;top: 13%;" class="text-xs-center">
                <v-card flat>
                    <v-card-title primary-title>
                    <h4>Register</h4>
                    </v-card-title>
                    <v-form ref="registerForm" :value="formValid">
                    <v-text-field name="name" label="name" v-model="newUser.name"></v-text-field>
                    <v-text-field name="email" label="email" type="email" v-model="newUser.email"></v-text-field>
                    <v-text-field name="Password" label="Password" type="password" v-model="newUser.password"></v-text-field>
                    <v-card-actions>
                    <v-btn primary large block @click="userRegister">Register</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
                </v-container>
            </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar
        v-model="snackbar.show"
        :timeout="timeout"
        >
        {{ snackbar.text }}
            <v-btn
            color="blue"
            text
            @click="snackbar.show = false"
            >
            Close
            </v-btn>
     
        </v-snackbar>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Register",
    data() {
        return {
            formValid : false,
            timeout: '2000',
            newUser:{
                name: '',
                email: '',
                password: ''
            },
            snackbar:{
                text : '',
                show: false
            }
        }
    },
    methods: {
        userRegister(){
            if(this.$refs.registerForm.validate())
            {
               // console.log({event , $form: this.$refs.registerForm});
               axios.post('http://localhost:8000/api/register' , this.newUser)
                .then((res)=>{
                    if(res.data.success == "ok")
                    {
                        this.snackbar.show = true;
                        this.snackbar.text = "Register is ok....";
                    }
                    this.$router.push('/login');
                    console.log(res);
                }).catch((error)=>{
                    this.snackbar = {
                        show: true,
                        text: "errrrrrror"
                    }
                    console.log(error);
                });
                //console.log(this.newUser);
            }
            
        }
    }
}
</script>