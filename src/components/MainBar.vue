<template>
<div v-if="!this.$vuetify.breakpoint.mobile" class="fixed-bar">
    <v-card
        :height="$vuetify.breakpoint.height"
    >
        <v-navigation-drawer
          permanent
          :mini-variant.sync="$store.state.MainBar.isMini"
          color="#1a1e30"
          >
          <v-btn
              icon
              v-if="$store.state.MainBar.isMini"
              @click.stop="event(); mini = !mini; $store.state.MainBar.isMini = !$store.state.MainBar.isMini"
            >
              <v-icon color="white">mdi-chevron-right</v-icon>
            </v-btn>
            <v-list>
        <v-list-item class="white--text">
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Veterinary
            </v-list-item-title>
            <v-list-item-subtitle class="white--text">
                Admin Panel
            </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn
              icon
              @click.stop="event(); mini = !mini; $store.state.MainBar.isMini = !$store.state.MainBar.isMini"
            >
              <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <main-bar-list @loggedOut="logout"/>

        </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import MainBarList from './MainBarList.vue'
export default {
  components: { MainBarList },
  emits: ['menuClicked'],
  data () {
    return {
      mini: false,
      notMini: true
    }
  },
  mounted () {
    console.log(this.$vuetify.breakpoint.name)
  },
  methods: {
    log () {
      console.log('mini: ' + this.mini)
      console.log('notMini: ' + this.notMini)
    },
    event: function () {
      this.$emit('menuClicked', this.mini)
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

</style>
