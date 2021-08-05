<template>
        <v-card
          width="100%"
          height="100"
          elevation="2"
          outlined
        >
          <v-card-text class="text-center font-weight-black text">
            {{ msg }}
          </v-card-text>
            <v-row class="row mx-auto">
                <v-col>
                    <v-card-text class="text-center link" @click="navigate('Login')">
                        Login
                    </v-card-text>
                </v-col>
                <v-col>
                    <v-card-text class="text-center link" @click="navigate('Register')">
                        Register
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Profili görüntülemek için Login olun'
    }
  },
  methods: {
    navigate (route) {
      this.$router.push({name: `${route}`})
    }
  }
}
</script>

<style scoped>
.text {
    font-size: 1.5rem;
}
.text-div {
    width: 300px;
}
.row {
    width: 20%;
}
.link:hover {
    cursor: pointer;
    font-size: 20px;
}
</style>
