<template>
  <div id="app">
    <v-app>
        <main-bar @logout="logout" v-if="this.$store.state.isUserLoggedIn"/>
        <top-bar v-if="this.$store.state.isUserLoggedIn"/>
      <div :class="{'not-logged-in': !this.$store.state.isUserLoggedIn, 'menu-small': this.$store.state.MainBar.isMini, 'menu-large': !this.$store.state.MainBar.isMini, 'no-menu': $vuetify.breakpoint.mobile}" class="body">
        <router-view @popSnackbar="popup"/>
      </div>
      <v-snackbar v-model="snackbar.value" v-if="snackbar.value" timeout="4000" :color="snackbar.color" top right>{{snackbar.message}}</v-snackbar>
    </v-app>
  </div>
</template>

<script>
import MainBar from './components/MainBar.vue'
import TopBar from './components/TopBar.vue'
export default {
  name: 'App',
  components: {
    MainBar,
    TopBar
  },
  data () {
    return {
      isMini: false,
      snackbar: {
        value: false,
        message: '',
        color: ''
      }
    }
  },
  methods: {
    logout () {
      sessionStorage.clear()
      console.log(this.$store.state.user)
    },
    popup (payload) {
      this.snackbar.message = payload.message
      this.snackbar.color = payload.color
      this.snackbar.value = true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
#app {
  font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Poiret One', cursive 'Russo One', 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px !important;
}
.body {
  margin-top: 0 !important;
}
.fixed-bar {
  position: fixed;
  top: 0em;
  left: 0em;
  z-index: 2;
}
.toolbar-position {
  position: fixed;
  top: 0em;
  left: 0em;
  z-index: 2;
  margin-left: 256px;
  padding-right: 256px;
}
.menu-small {
  margin-left:50px;
  top: 0em;
}
.menu-large {
  margin-left: 256px;
  top: 0em;
}
.no-menu {
  margin-left: 0;
  top: 0em;
}
.not-logged-in {
  top: 0em !important;
  left: 0em !important;
  margin: 0 !important;
  padding: 0 !important;
}
.v-data-table table thead tr th:hover {
  color: blue !important
}
.v-data-table table thead th {
  border: none !important
}
.v-data-table table tbody td {
  border: none !important
}
</style>
