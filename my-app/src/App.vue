<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn elevation="2" @click="logout" v-if="loggedIn">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import {mapGetters,mapActions} from 'vuex';
export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({

  }),
  created() {
    //if(localStorage.getItem('token')){
      //this.isLoggedIn = true;
    //}
      this.checkUserState();
  },
  computed: {
      ...mapGetters({
          loggedIn: 'user/loggedIn'
      }),
    /*loggedIn(){
      return this.$store.getters['user/loggedIn'];
    }*/
  },
  methods: {
      ...mapActions({
          userLogout: 'user/userLogout',
          checkUserState: 'user/setLoggedInState'
      }),
    logout(){
        this.userLogout();
      // this.$store.dispatch('user/userLogout');
      this.$router.push('/login');
    }
  },
};
</script>
