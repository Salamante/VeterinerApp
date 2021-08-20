<template>
  <v-card
    elevation="0"
    max-width="800"
    height="337"
    class="text-start title"
  >
    <v-carousel
      :continuous="true"
      :cycle="cycle"
      :show-arrows-on-hover="true"
      hide-delimiter-background
      height="inherit"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-card
          class="mx-auto"
          max-width="inherit"
          height="347"
          elevation="0"
        >
        <v-row>
          <v-col cols="8">
            <v-card-title class="text-h4 title">
              19 Ağustos SALI
            </v-card-title>
            <v-card-subtitle>
              <v-chip small color="orange">
              16:30
              </v-chip>
            </v-card-subtitle>
            <v-card-text class="font-weight-bold mt-7">
              Gofret - British Shorthair
            </v-card-text>
            <v-card-text class="card-text">
              Genel Kontrol
            </v-card-text>
            <v-card-text class="font-italic card-text">
              Ahmet ORMAN
            </v-card-text>
          </v-col>

          <v-col cols="4">
              <v-list-item-avatar
                size="150"
                color="grey"
              >
              <v-img
              :src="pisiUrl"
              >
              </v-img>
              </v-list-item-avatar>
          </v-col>
        </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import Pisi from '@/assets/pisi.jpg'
export default {
  data () {
    return {
      pisiUrl: Pisi,
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1'
      ],
      cycle: true,
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
    }
  }
}
</script>

<style scoped>
.card-text {
  height: 10px;
}
.title {
  font-family: 'Poiret One', cursive !important;
}
</style>
