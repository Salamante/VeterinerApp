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
        v-for="(app, i) in appointmentsClose"
        :key="i"
      >
        <v-card
          class="mx-auto"
          max-width="inherit"
          height="347"
          elevation="0"
        >
        <v-row>
          <v-col cols="6">
            <v-card-title class="text-h4 title secondary--text">
              <v-icon large class="ml-3 mr-5">
                  mdi-calendar-month
                </v-icon>
              {{app.dayText}}
            </v-card-title>
            <v-card-subtitle>
              <v-chip large dark color="orange" class="mt-4">
                <v-icon large class="ml-3 mr-5">
                  mdi-clock-time-five-outline
                </v-icon>
                {{app.time}}
              </v-chip>
            </v-card-subtitle>
            <v-card-text class="font-weight-bold mt-7">
              {{app.animalName}} - British Shorthair
            </v-card-text>
            <v-card-text class="card-text">
              {{app.description}}
            </v-card-text>
            <v-card-text class="font-italic card-text">
              Ahmet ORMAN
            </v-card-text>
          </v-col>

          <v-col cols="5">
              <v-list-item-avatar
                size="250"
                color="grey"
              >
              <v-img
              :src="pisiUrl[i]"
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
import Pisi2 from '@/assets/pisi2.jpg'
import Pisi3 from '@/assets/pisi3.jpg'
// import AppointmentService from '@/services/AppointmentService'
export default {
  data () {
    return {
      appointmentsAll: [],
      appointmentsClose: [],
      pisiUrl: [Pisi, Pisi2, Pisi3],
      cycle: true
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    async initialize () {
      this.appointmentsClose = await this.$store.state.Appointments.appointmentsClose
      this.appointmentsAll = await this.$store.state.Appointments.appointments
    }
  }
}
</script>

<style scoped>
.card-text {
  height: 10px;
}
.title {
  font-family: 'Montserrat Alternates', sans-serif !important;
}
</style>
