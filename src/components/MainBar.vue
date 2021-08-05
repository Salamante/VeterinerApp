<template>
<div v-if="!this.$vuetify.breakpoint.mobile" class="fixed-bar">
    <v-card
        :height="$vuetify.breakpoint.height"
        dark
    >
        <v-navigation-drawer
          permanent
          :mini-variant.sync="mini"
          >
          <v-btn
              icon
              v-if="mini"
              @click.stop="event(); mini = !mini"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Veterinary
            </v-list-item-title>
            <v-list-item-subtitle>
                Admin Panel
            </v-list-item-subtitle>
            </v-list-item-content>
            <v-btn
              icon
              @click.stop="event(); mini = !mini"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

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
