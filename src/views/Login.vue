<template>
  <div class="form-container mx-auto">
    <v-form>
        <div>
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
            @click="login(); loader = 'loading4'">
              Giriş Yap
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
        <br />
        <br />
        <br />
        <h3>test için:</h3>
        <h3>email: coskuntest@gmail.com</h3>
        <h3>password: test123456</h3>
        <br />
      </div>
      <v-snackbar
        v-if="snackbar"
        v-model="snackbar"
      >
        Giriş Başarılı!
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      isRegistered: false,
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false,
      snackbar: false,
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
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', this.response.data.refresh)

        // Burada profile ait datayı serverdan cekip yine store icinde saklıyoruz.
        const payload = (await AuthenticationService.getUserProfile()).data
        this.$store.dispatch('setUser', payload)
        localStorage.setItem('profile', JSON.stringify(payload))

        // Login olduktan sonra /profile e yonlendiriyor.

        this.snackbar = true
        setTimeout(() => { this.snackbar = false }, 2000)
        setTimeout(() => this.$router.push({
          name: 'Profile'
        }), 1500)
        setTimeout(() => window.location.reload(), 1700)
      } catch (err) {
        console.log(err)
        setTimeout(() => { this.error = null }, 2000)
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
}
.form-container {
    width: 30%;
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
