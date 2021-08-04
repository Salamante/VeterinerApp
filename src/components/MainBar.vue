<template>
<div v-if="!this.$vuetify.breakpoint.mobile" class="fixed-bar">
    <v-card
        :height="$vuetify.breakpoint.height"
        width="256"
        dark
    >
        <v-navigation-drawer permanent>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Veterinary
            </v-list-item-title>
            <v-list-item-subtitle>
                Admin Panel
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <main-bar-list />

        </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import MainBarList from './MainBarList.vue'
export default {
  components: { MainBarList },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$vuetify.breakpoint.name)
    console.log(this.isVisible)
  }
}
</script>
