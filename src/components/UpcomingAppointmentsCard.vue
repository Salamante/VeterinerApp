<template>
  <v-card
    class="mx-auto"
    min-width="344"
    outlined
    rounded="lg"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline text-start mb-4">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                ><v-icon class="mr-4">mdi-file-chart</v-icon>
                Son 1 Hafta
                </v-chip>
        </div>
        <v-list-item-title class="text-h5 grey--text text-start mb-1">
          Yaklaşan Randevular
        </v-list-item-title>
        <v-list-item-subtitle class="text-start black--text text-h4">{{appointmentsLength}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon
      ><v-icon x-large color="green">mdi-calendar</v-icon></v-list-item-icon>
    </v-list-item>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    appointmentsLength: {
      default: 15
    }
  }

}
</script>
