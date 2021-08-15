<template>
  <div id="app">
    <v-app>
        <main-bar @menuClicked="MenuSwitch" @logout="logout" v-if="this.$store.state.isUserLoggedIn"/>
        <top-bar v-if="this.$store.state.isUserLoggedIn"/>
      <div :class="{'not-logged-in': !this.$store.state.isUserLoggedIn, 'menu-small': isMini, 'menu-large': !isMini}" class="body">
        <router-view/>
      </div>
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
      isMini: false
    }
  },
  methods: {
    MenuSwitch () {
      this.isMini = !this.isMini
    },
    logout () {
      sessionStorage.clear()
      console.log(this.$store.state.user)
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
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
.body {
  margin-top: 60px;
}
.menu-small {
  margin-left:50px;
}
.menu-large {
  margin-left: 256px;
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
</style>
