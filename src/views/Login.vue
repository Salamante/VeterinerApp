<template>
  <div class="body">
    <v-container>
      <v-form v-if="!this.$store.state.isUserLoggedIn">
          <div class="form-container mx-auto">
              <v-col>
                  <h1 class="mt-5 mb-2">Login</h1>
                  <h4 class="primary--text mb-7">Veterinary Admin Panel</h4>
                  <v-text-field
                    class="mr-5 ml-5"
                    v-model="email"
                    label="Email"
                    outlined
                    autocomplete="off"
                    persistent-placeholder
                    clearable
                    :rules="rules"
                    hint="ex: vuejs@gmail.com"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>

                  <v-text-field
                    class="mr-5 ml-5"
                    v-model="password"
                    type="password"
                    label="Şifre"
                    outlined
                    autocomplete="off"
                    persistent-placeholder
                    clearable
                    :rules="rules"
                    hint="Required to be 8 character long minimum"
                    prepend-inner-icon="mdi-lock-open"
                  ></v-text-field>
              </v-col>
            <v-btn
              class="mb-7"
              :loading="loading4"
              :disabled="loading4"
              @click="login(); loader = 'loading4'">
                Log in
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-btn
            color="secondary"
            elevation="0"
            plain
            text
            small
            :to="{name: 'Register'}"
            class="create-acc-btn"><v-icon small>mdi-badge-account-outline</v-icon>Yeni hesap olustur
          </v-btn>
        </div>
      </v-form>
      <div v-if="this.$store.state.isUserLoggedIn" class="ma-auto">
        <h3 class="Secondary--text mt-16">Zaten giriş yaptınız.</h3>
        <v-btn text plain :to="{name: 'Home'}">Anasayfa</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import PrefetchService from '@/services/PrefetchService'
export default {
  data () {
    return {
      email: '',
      password: '',
      isRegistered: false,
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false,
      response: null
    }
  },
  computed: {
    user () {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  mounted () {
    console.log(this.$store.state.isUserLoggedIn)
  },
  methods: {
    async login () {
      try {
        // AuthenticationService deki login methodunu cagiriyoruz burda.
        this.response = await AuthenticationService.login(this.user)
        // Burada login olduktan sonra serverdan gelen payload u Vuex store(./store/store.js) icinde saklıyoruz.
        const token = this.response.data.access
        this.$store.dispatch('setToken', token)
        console.log('token: ' + this.$store.state.token)
        this.$emit('popSnackbar', {color: 'green', message: 'Login başarılı!'})
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', this.response.data.refresh)
        await PrefetchService.initialize()
        console.log('prefetch.initialize initialized')
        console.log(this.$store.state.Animals.animals)
        await PrefetchService.appointmentClose()
        console.log('prefetch.appointmentClose initialized')
        console.log(this.$store.state.Appointments.appointmentsClose)
        console.log(this.$store.state.Appointments.appointments)

        this.$router.push({name: 'Home'})

        // Burada profile ait datayı serverdan cekip yine store icinde saklıyoruz.
        const payload = (await AuthenticationService.getUserProfile()).data
        this.$store.dispatch('setUser', payload)
        localStorage.setItem('profile', JSON.stringify(payload))
      } catch (err) {
        console.log(err.response.data.detail)
        this.$emit('popSnackbar', {color: 'red', message: err.response.data.detail})
      }
    },
    alertPopUp () {
      alert('Login başarılı!')
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
  height: 100vh;
  background: -webkit-linear-gradient(to right, #E4E5E6, #00416A);
  background: linear-gradient(to right, #E4E5E6, #00416A);
}
.form-container {
    width: 30%;
    min-height: 450px;
    background: white;
    margin-top: 50px;
    border-radius: 15px;
}
.create-acc-btn {
  position: absolute;
  margin-top: 60px;
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
