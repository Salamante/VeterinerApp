<template>
        <v-card
          min-width="40%"
          height="500"
          elevation="2"
          outlined
          class="mt-10"
        >
          <v-card-title class="title font-weight-black">
              <v-icon large class="mr-5" color="primary">mdi-email-edit</v-icon>
              E-mail'i Değiştir
          </v-card-title>
          <v-divider class="mt-4 mb-6"></v-divider>
          <v-form>
            <v-container>
              <h4 class="text-start ml-3">Eski E-mail</h4>
              <email-text-field :label="oldLabel" @input="updateOldEmail"/>
              <h4 class="text-start ml-3">Yeni E-mail</h4>
              <email-text-field :label="newLabel" @input="updateNewEmail"/>
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
import EmailTextField from './EmailTextField.vue'
export default {
  components: { EmailTextField },
  data: () => ({
    oldEmail: null,
    newEmail: null,
    oldLabel: 'Eski',
    newLabel: 'Yeni',
    form: {
      emitedOldEmail: '',
      emitedNewEmail: ''
    }
  }),
  methods: {
    clearForm () {
      this.oldEmail = ''
      this.newEmail = ''
    },
    submit () {
      this.form.emitedOldEmail = this.oldEmail
      this.form.emitedNewEmail = this.newEmail
      this.$emit('submit', this.form)
    },
    updateOldEmail (payload) {
      this.oldEmail = payload
    },
    updateNewEmail (payload) {
      this.newEmail = payload
    }
  }
}
</script>
