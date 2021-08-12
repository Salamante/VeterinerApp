<template>
  <div class="body">
    <v-container>
      <v-form>
          <div class="form-container mx-auto">
              <h1 class="text-color pt-4">Randevu Oluştur</h1>
              <v-col class="pr-8 pl-8"
                >
                  <h4 class="text-start mb-2 orange--text">Hayvan</h4>
                  <v-select
                    v-model="select"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                    ></v-select>

                  <h4 class="text-start mb-2">Tarih</h4>
                  <calendar />

                  <h4 class="text-start mb-2">Saat</h4>
                  <time-picker />

                  <h4 class="text-start mb-2">Açıklama</h4>
                    <v-textarea
                       clearable
                       clear-icon="mdi-close-circle"
                       label="Açıklama girin"
                       :value="description"
                    ></v-textarea>
              </v-col>
              <div id="error">
                <v-alert
                  type="error"
                  v-if="error"
                  class="mr-10 mt-2"
                  color="pink">
                  {{error}}
                </v-alert>
              </div>
            <v-btn
              :loading="loading4"
              :disabled="loading4"
              @click="loader = 'loading4'" class="mb-6">
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
        <v-snackbar
          class="ma-auto"
          top
          right
          v-if="snackbar.value"
          v-model="snackbar.value"
          :color="snackbar.color"
        >
          {{snackbar.message}}
        </v-snackbar>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue'
import TimePicker from '../components/TimePicker.vue'
export default {
  components: {
    Calendar,
    TimePicker
  },
  data () {
    return {
      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ],
      description: '',
      error: null,
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false,
      snackbar: {
        value: false,
        message: '',
        color: ''
      }
    }
  },
  computed: {
    user () {
      return {
        email: this.email,
        password: this.password,
        title: this.title,
        name: this.name,
        phone: this.phone
      }
    }
  },
  methods: {
    async register () {
      try {
      } catch (error) {
        console.log(error.response.data)
      }
    },
    alertPopUp () {
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
.error {
  color: red;
}
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 1080px;
  background: #C6FFDD;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
