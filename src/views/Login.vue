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
          <v-alert v-if="alert.value" type="error" max-width="500px" class="mt-5 ma-auto white--text">
            {{alert.message}}
          </v-alert>
        </div>
        <v-snackbar
          v-if="snackbar.value"
          v-model="snackbar.value"
          :color="snackbar.color"
          top
          right
        >
          {{snackbar.message}}
        </v-snackbar>
      </v-form>
      <div v-if="this.$store.state.isUserLoggedIn" class="ma-auto">
        <h3 class="white--text mt-16"><span class="black--text">{{this.$store.state.user.name.toUpperCase()}}</span> olarak giriş yaptınız.</h3>
        <v-btn text plain :to="{name: 'Home'}">Anasayfa</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      alert: {
        value: false,
        message: ''
      },
      isRegistered: false,
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false,
      snackbar: {
        value: false,
        message: '',
        color: ''
      },
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
        this.response = await AuthenticationService.login(
          this.user
        )
        // Burada login olduktan sonra serverdan gelen payload u Vuex store(./store/store.js) icinde saklıyoruz.
        const token = this.response.data.access
        this.$store.dispatch('setToken', token)
        console.log('token: ' + this.$store.state.token)
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', this.response.data.refresh)
        this.snackbar.message = 'Login işlemi başarılı!'
        this.snackbar.color = 'green'
        this.snackbar.value = true
        setTimeout(() => { this.snackbar = false }, 2000)
        this.$router.push({name: 'Profile'})
        // setTimeout(() => window.location.reload(), 5200)

        // Burada profile ait datayı serverdan cekip yine store icinde saklıyoruz.
        const payload = (await AuthenticationService.getUserProfile()).data
        this.$store.dispatch('setUser', payload)
        localStorage.setItem('profile', JSON.stringify(payload))

        // Login olduktan sonra /profile e yonlendiriyor.
      } catch (err) {
        console.log(err.response.data.detail)
        this.alert.message = String(err.response.data.detail)
        this.alert.value = true
        setTimeout(() => { this.alert.value = false }, 10000)
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
