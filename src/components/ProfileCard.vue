<template>
  <v-card width="100%" height="300" elevation="2" outlined v-if="isLogged">
    <div class="d-flex flex-row flex-nowrap justify-center container">
      <v-avatar class="mr-5" color="grey" size="268" round>
        <v-img
          src="https://www.vscnl.ca/wp-content/uploads/2020/06/Dr-Laura-Rogers-Avatar-FAA.png"
        ></v-img>
      </v-avatar>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"
        chips
        truncate-length="0"
        hide-input
        class="align-self-end file-input"
      ></v-file-input>
      <v-col class="flex-grow-0 d-flex flex-column flex-nowrap col">
        <v-row>
          <h3 class="align-self-end mb-3">
            Hoşgeldin, <span class="font-weight-black">{{ name }}!</span>
          </h3>
        </v-row>
        <v-row>
          <h4>
            Son giriş
            <span class="font-weight-black">{{ lastLoginDate }}</span> saat önce
          </h4>
        </v-row>
      </v-col>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      default: 'null'
    },
    lastLoginDate: {
      default: 10
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
.container {
  max-width: 50%;
}
.col {
  min-width: 30%;
}
.file-input {
  max-width: 5%;
}
.theme--light.v-icon {
    color: #82b1ff;
}
</style>
