<template>
  <div class="body">
    <v-container>
      <v-form>
          <div class="form-container mx-auto">
              <h1>Login</h1>
              <v-col>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                    clearable
                    :rules="rules"
                    hint="ex: vuejs@gmail.com"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Şifre"
                    outlined
                    clearable
                    :rules="rules"
                    hint="Required to be 8 character long minimum"
                  ></v-text-field>
              </v-col>
            <v-btn
              :loading="loading4"
              :disabled="loading4"
              @click="login(); loader = 'loading4'">
                Giriş Yap
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-alert v-if="alert.value" type="error" max-width="500px" class="mt-5 ma-auto white--text">
            {{alert.message}}
          </v-alert>
          <br />
          <br />
          <br />
          <h3>test için:</h3>
          <h3>email: test@gmail.com</h3>
          <h3>password: test12345</h3>
          <br />
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
        setTimeout(() => { this.snackbar = false }, 5000)
        setTimeout(() => this.$router.push({
          name: 'Profile'
        }), 5000)
        setTimeout(() => window.location.reload(), 5200)

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
    background: white;
    margin-top: 50px;
    border-radius: 15px;
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
