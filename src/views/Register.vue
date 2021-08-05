<template>
  <div class="body">
    <v-form>
        <div class="form-container mx-auto">
            <h1>REGISTER</h1>
            <v-col class="pr-4 pl-4"
              v-if="!isRegistered">
                <h4 class="text-start mb-2">Email</h4>
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  clearable
                  :rules="rules"
                  hint="ex: vuejs@gmail.com"
                ></v-text-field>

                <h4 class="text-start mb-2">Password</h4>
                <v-text-field
                  v-model="password"
                  type="password"
                  label="Şifre"
                  outlined
                  clearable
                  :rules="rules"
                  hint="Required to be 8 character long minimum"
                ></v-text-field>

                <h4 class="text-start mb-2">Name</h4>
                <v-text-field
                  v-model="name"
                  label="İsim"
                  outlined
                  clearable
                  :rules="rules"
                  hint="ör: Emre Altın"
                ></v-text-field>

                <h4 class="text-start mb-2">Phone</h4>
                <v-text-field
                  v-model="phone"
                  label="Telefon"
                  outlined
                  clearable
                  :rules="rules"
                  hint="En az 8 karakter uzunlugunda olmalı"
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
            @click="register(); loader = 'loading4'" class="mb-6">
              Üye Ol
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
        v-if="snackbar"
        v-model="snackbar"
      >
        Registeration is Successful
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
      name: '',
      title: 'SanalDunya Bilisim Tek',
      error: null,
      isRegistered: false,
      rules: [
        value => !!value || 'Gerekli'
      ],
      loader: null,
      loading4: false,
      snackbar: false
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
    NavigateTo (route) {
      this.$router.push(route)
    },
    async register () {
      try {
        const response = await AuthenticationService.register(
          this.user
        )
        this.$store.dispatch('setToken', response.data.token)
        alert(`${response.data.access}`)
        setTimeout(() => { this.isRegistered = true }, 250)
        this.snackbar = true
        setTimeout(() => { this.snackbar = false }, 2000)
        // setTimeout(() => this.$router.push({
        //   name: 'root'
        // }), 1500)
      } catch (error) {
        console.log(this.error)
      }
    },
    alertPopUp () {
      alert('Registeration is succesfull!')
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
    margin-top: 50px;
    background: white;
    border-radius: 15px;
}
.chip {
  margin-left: 130px;
  position: absolute;
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
