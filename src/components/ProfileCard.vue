<template>
        <v-card
          width="100%"
          height="100"
          elevation="2"
          outlined
          v-if="isLogged"
        >
          <v-card-title class="title font-weight-black mt-3">
            {{ name.toUpperCase() }} 's PROFILE
          </v-card-title>
        </v-card>
</template>

<script>
export default {
  props: {
    name: {
      default: 'null'
    }
  },
  data () {
    return {
      isLogged: this.$store.state.isUserLoggedIn
    }
  }
}
</script>

<style scoped>

</style>
