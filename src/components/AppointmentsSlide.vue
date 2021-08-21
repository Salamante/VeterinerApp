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
import AppointmentService from '@/services/AppointmentService'
export default {
  data () {
    return {
      appointmentsAll: [],
      appointmentsClose: [],
      pisiUrl: [Pisi, Pisi2],
      cycle: true
    }
  },
  async mounted () {
    try {
      this.appointmentsAll = (await AppointmentService.getAllAppointments()).data
      let today = new Date()
      this.appointmentsAll.forEach(appointment => {
        appointment.time = this.modifyTimeText(appointment.time)
        const formattedDay = new Date(appointment.day)
        let remainingDays = Math.floor((formattedDay - today) / (1000 * 60 * 60 * 24))
        if (remainingDays > 0 && remainingDays < 5) {
          appointment.dayText = this.modifyDayText(appointment.day)
          appointment.animalName = this.getAnimalName(appointment.animal)
          this.appointmentsClose.push(appointment)
        }
      })
    } catch (err) {
      console.log(err.response)
    }
  },
  methods: {
    modifyTimeText (time) {
      const regex = /\d+.\d+/
      return time.match(regex)[0]
    },
    modifyDayText (day) {
      const arr = day.split('-').splice(1, 2)
      const dayNum = arr[1]
      let dayText = ''
      switch (arr[0]) {
        case '01':
          dayText = 'Ocak'
          break
        case '02':
          dayText = 'Şubat'
          break
        case '03':
          dayText = 'Mart'
          break
        case '04':
          dayText = 'Nisan'
          break
        case '05':
          dayText = 'Mayıs'
          break
        case '06':
          dayText = 'Haziran'
          break
        case '07':
          dayText = 'Temmuz'
          break
        case '08':
          dayText = 'Ağustos'
          break
        case '09':
          dayText = 'Eylül'
          break
        case '10':
          dayText = 'Ekim'
          break
        case '11':
          dayText = 'Kasım'
          break
        case '12':
          dayText = 'Aralık'
          break
        default:
          dayText = 'Object Object'
          break
      }
      return `${dayNum} ${dayText}`
    },
    getAnimalName (id) {
      const animals = this.$store.state.Animals.animals
      // eslint-disable-next-line eqeqeq
      return (animals.find(o => o.id == id)).name
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
