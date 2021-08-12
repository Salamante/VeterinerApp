<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    rounded="lg"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline text-start mb-4">
              <v-chip
                class="ma-2"
                color="orange"
                text-color="white"
                ><v-icon class="mr-4">mdi-arrow-up-bold</v-icon>
                Son 24 saat
                </v-chip>
        </div>
        <v-list-item-title class="text-h5 grey--text text-start mb-1">
          Bildirimler
        </v-list-item-title>
        <v-list-item-subtitle class="text-start black--text text-h4">{{alertLength}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon
      ><v-icon x-large color="orange">mdi-bell</v-icon></v-list-item-icon>
    </v-list-item>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    alertLength: {
      default: 24
    }
  }

}
</script>
