<template>
        <v-card
          min-width="40%"
          height="360"
          elevation="2"
          outlined
          class="mt-10"
        >
          <v-card-title class="title font-weight-black">
              <v-icon large class="mr-5">mdi-rename-box</v-icon>
              İsmi Güncelle
          </v-card-title>
          <v-divider class="mt-4 mb-6"></v-divider>
          <v-form>
            <v-container>
              <h4 class="text-start ml-3">Eski İsim</h4>
              <name-text-field :label="newLabel" @input="updateNewName"/>
            </v-container>
            <v-divider class="mb-4 mt-2"></v-divider>
            <div id="button-container" class="d-flex ml-6">
                <v-btn type="submit" dark class="mt-2" color="light-blue accent-4" @click="submit">Güncelle</v-btn>
                <v-btn dark class="mt-2 ml-4" @click="clearForm">Formu Resetle</v-btn>
            </div>
          </v-form>
        </v-card>
</template>

<script>
import NameTextField from './NameTextField.vue'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  components: {
    NameTextField,
    AuthenticationService
  },
  data: () => ({
    newName: '',
    newLabel: 'Yeni'
  }),
  methods: {
    clearForm () {
      this.newName = ''
    },
    async submit () {
      const response = await AuthenticationService.changeUserName(this.newName)
      console.log(response)
    },
    updateNewName (payload) {
      this.newName = payload
    }
  }
}
</script>
