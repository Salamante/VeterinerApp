<template>
  <div class="body">
    <v-container>
      <appointment-table />
      <v-form>
          <div class="form-container mx-auto mb-15">
              <h1 class="text-color pt-4">Randevu Oluştur</h1>
              <v-col class="pr-8 pl-8"
                >
                  <h4 class="text-start mb-2 orange--text">Hayvan</h4>
                  <v-select
                    v-model="select"
                    :items="items"
                    item-text="name"
                    item-value="id"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    ></v-select>

                  <h4 class="text-start mb-2">Tarih</h4>
                  <date-picker @input="updateDate"/>

                  <h4 class="text-start mb-2">Saat</h4>
                  <time-picker @input="updateTime"/>

                  <h4 class="text-start mb-2">Açıklama</h4>
                    <v-textarea
                       clearable
                       clear-icon="mdi-close-circle"
                       label="Açıklama girin"
                       :value="description"
                       v-model="description"
                    ></v-textarea>
              </v-col>
            <v-btn
              :loading="loading4"
              :disabled="loading4"
              @click="loader = 'loading4'; createAppointment()" class="mb-6">
                Randevu Oluştur
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-chip
            link
            outlined
            class="chip"
            :to="{name: 'Home'}"
            color="green"
          ><v-icon class="mr-1">mdi-home</v-icon>Anasayfa</v-chip>
        </div>
      </v-form>
    </v-container>
    <footer-bar />
  </div>
</template>

<script>
import AppointmentService from '@/services/AppointmentService'
import AnimalService from '@/services/AnimalService'
import TimePicker from '../components/TimePicker.vue'
import DatePicker from '../components/DatePicker.vue'
import AppointmentTable from '../components/AppointmentTable.vue'
import FooterBar from '../components/Footer.vue'

export default {
  components: {
    TimePicker,
    DatePicker,
    AppointmentTable,
    FooterBar
  },
  data () {
    return {
      date: '',
      time: '',
      select: { },
      items: [],
      description: '',
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false
    }
  },
  computed: {
    appointment () {
      return {
        animal: this.select.id,
        day: this.date,
        time: this.time,
        description: this.description
      }
    }
  },
  created () {
    this.getAllAnimals()
  },
  methods: {
    async getAllAnimals () {
      try {
        const response = (await AnimalService.getAllAnimals()).data
        response.forEach(element => {
          this.items.push(element)
        })
        // console.log(this.items)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async createAppointment () {
      try {
        const response = (await AppointmentService.createAppointment(this.appointment)).data
        console.log(response)
        this.$nextTick(() => {
          window.location.reload()
        })
        this.$emit('popSnackbar', {color: 'green', message: 'Randevu oluşturuldu!'})
      } catch (err) {
        this.$emit('popSnackbar', {color: 'red', message: err.response.data})
        console.log(err.response)
      }
    },
    updateDate (payload) {
      this.date = payload
      console.log(this.date)
    },
    updateTime (payload) {
      this.time = payload
      console.log(this.time)
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  }
}
</script>

<style scoped>
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 160vh;
  height: 100vh;
  background: #d7dadb;
}
.form-container {
    width: 40%;
    margin-top: 50px;
    background: white;
    border-radius: 15px;
}
.chip {
  margin-left: 40px;
  position: absolute;
}
h4 {
    color: #FB8C00
}
h1 {
    color: #E65100
}
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
