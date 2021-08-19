<template>
  <v-card
    min-width="320"
    width="400"
    height="165"
    outlined
    rounded="lg"
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline text-start mb-4">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                ><v-icon class="mr-4">mdi-arrow-up-bold</v-icon>
                12%
                </v-chip>
        </div>
        <v-list-item-title class="text-h5 grey--text text-start mb-1">
          Müşteriler
        </v-list-item-title>
        <v-list-item-subtitle class="text-start black--text text-h4">{{customerLength}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon
      ><v-icon x-large color="green">mdi-account</v-icon></v-list-item-icon>
    </v-list-item>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    customerLength: {
      default: 24
    }
  }

}
</script>
