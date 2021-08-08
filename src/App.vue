<template>
  <div id="app">
    <v-app>
        <main-bar @menuClicked="MenuSwitch" @logout="logout"/>
        <top-bar />
      <div :class="{'menu-small': isMini, 'menu-large': !isMini}" class="body">
        <router-view/>
        <v-snackbar v-model="snackbar.value" class="snackbar">{{ snackbar.logoutText }}</v-snackbar>
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
      isMini: false,
      snackbar: {
        value: false,
        logoutText: 'Logged Out!'
      }
    }
  },
  methods: {
    MenuSwitch () {
      this.isMini = !this.isMini
    },
    logout () {
      this.snackbar.value = true
      setTimeout(() => { this.snackbar.value = false }, 2000)
      sessionStorage.clear()
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
.snackbar {
  position: absolute;
  margin: auto;
}
</style>
