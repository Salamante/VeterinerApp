<template>
  <div id="app">
    <v-app>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fixed-bar {
  position: fixed;
  top: 0em;
  left: 0em;
  z-index: 2;
}
</style>
