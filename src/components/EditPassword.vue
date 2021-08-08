<template>
  <v-card min-width="40%" height="500" elevation="2" outlined class="mx-auto mt-10">
    <v-card-title class="title font-weight-black">
      <v-icon large class="mr-5">mdi-lock-question</v-icon>
      Parola Değiştir
    </v-card-title>
    <v-divider class="mt-4 mb-6"></v-divider>
    <v-form>
      <v-container>
        <password-text-field
            ref="PasswordTextField"
          :placeholder="placeholder"
          :title="title.old"
          @input="updateOldPass"
        />
        <password-text-field
            ref="PasswordTextField2"
          :placeholder="placeholder"
          :title="title.new"
          @input="updateNewPass"
        />
      </v-container>
      <v-divider class="mb-4 mt-2"></v-divider>
      <div id="button-container" class="d-flex ml-6">
        <v-btn
          type="submit"
          dark
          class="mt-2"
          color="light-blue accent-4"
          @click="submit"
          >güncelle</v-btn
        >
        <v-btn dark class="mt-2 ml-4" @click="clearForm">Formu Resetle</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import PasswordTextField from './PasswordTextField.vue'
export default {
  components: { PasswordTextField },
  data: () => ({
    oldPassword: null,
    newPassword: null,
    form: {
      emitedOldPassword: '',
      emitedNewPassword: ''
    },
    placeholder: 'Parolayı giriniz',
    tooltip: '',
    title: {
      old: 'Eski parola',
      new: 'Yeni parola'
    }
  }),
  methods: {
    clearForm () {
      this.$refs.PasswordTextField.clearField()
      this.$refs.PasswordTextField2.clearField()
    },
    submit () {
      this.form.emitedOldPassword = this.oldPassword
      this.form.emitedNewPassword = this.newPassword
      this.$emit('changePass', this.form)
      console.log(this.form.emitedPassword + ' ' + this.form.emitedNewPassword)
    },
    updateOldPass (payload) {
      this.oldPassword = payload
    },
    updateNewPass (payload) {
      this.newPassword = payload
    }
  }
}
</script>
