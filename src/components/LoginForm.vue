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
  }
}
