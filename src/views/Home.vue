<template>
  <div class="hello">
    <v-btn :to="{name: 'Login'}">Login sayfası</v-btn>
    <br />
    <v-spacer></v-spacer>
    <br />
    <h3>Profile Sayfası Login Olmadan Gorulmuyor</h3>
    <br />
    <br />
    <h3>test için:</h3>
    <h3>email: coskuntest@gmail.com</h3>
    <h3>password: test12345</h3>
    <br />
    <v-btn :to="{name: 'Profile'}">Profile sayfası</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
