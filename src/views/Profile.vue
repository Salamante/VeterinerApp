<template>
    <div id="main-container d-flex flex-row">
      <v-container>
        <not-logged-in-profile v-if="!this.$store.state.isUserLoggedIn"/>
        <profile-card :name="this.user.name" v-if="this.$store.state.isUserLoggedIn"/>
        <v-col class="d-flex flex-column justify-start">
          <v-row>
            <v-col>
              <edit-email v-if="this.$store.state.isUserLoggedIn" @submit="submit"/>
            </v-col>
            <v-col>
              <edit-password v-if="this.$store.state.isUserLoggedIn" @changePass="changePass" />
            </v-col>
          </v-row>
          <v-row class="d-flex flex-row justify-space-between">
            <edit-name class=""/>
            <edit-name class=""/>
          </v-row>
        </v-col>
        <v-snackbar v-model="snackbar" color="red" top rounded="pill">Şifre değiştirme başarılı!</v-snackbar>
      </v-container>
    </div>
</template>

<script>
import EditEmail from '../components/EditEmail.vue'
import MainBar from '../components/MainBar.vue'
import NotLoggedInProfile from '../components/NotLoggedInProfile.vue'
import ProfileCard from '../components/ProfileCard.vue'
import AuthenticationService from '@/services/AuthenticationService'
import EditPassword from '../components/EditPassword.vue'
import EmailTextField from '../components/EmailTextField.vue'
import PasswordTextField from '../components/PasswordTextField.vue'
import EditName from '../components/EditName.vue'

export default {
  components: {
    MainBar,
    ProfileCard,
    EditEmail,
    NotLoggedInProfile,
    EditPassword,
    EmailTextField,
    PasswordTextField,
    EditName
  },
  data () {
    return {
      newName: '',
      email: '',
      user: '',
      nameToChange: '',
      emailToChange: '',
      oldPass: '',
      newPass: '',
      snackbar: false
    }
  },
  async mounted () {
    // this.user = await JSON.parse(localStorage.getItem('profile'))
    this.user = await this.$store.state.user ? this.$store.state.user : 'null'
    console.log(this.$store.state.user.name)
  },
  methods: {
    async submit (payload) {
      this.nameToChange = payload.emitedName
      this.emailToChange = payload.emitedEmail
      try {
        await AuthenticationService.changeUserName(this.nameToChange)
      } catch (err) {
        console.log(err)
      }
    },
    async changePass (payload) {
      this.oldPass = payload.emitedOldPassword
      this.newPass = payload.emitedNewPassword
      try {
        await AuthenticationService.changePassword(this.oldPass, this.newPass)
        this.snackbar.value = true
        setTimeout(() => { this.snackbar.value = false }, 2000)
      } catch (err) {
        console.log(err)
      }
    },
    changeEmail (payload) {
      this.email = payload
    }
  }
}
</script>

<style scoped>
</style>
