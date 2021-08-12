<template>
    <div id="main-container d-flex flex-row">
      <v-container>
        <not-logged-in-profile v-if="!this.$store.state.isUserLoggedIn"/>
        <profile-card :name="this.user ? this.user.name : 'Ziyaretçi'" v-if="this.$store.state.isUserLoggedIn"/>
        <v-col class="d-flex flex-column justify-start">
          <v-row>
            <v-col>
              <edit-email v-if="this.$store.state.isUserLoggedIn" @submit="submit"/>
            </v-col>
            <v-col>
              <edit-password v-if="this.$store.state.isUserLoggedIn" @changePass="changePass" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="v-col">
              <edit-name v-if="this.$store.state.isUserLoggedIn" class="flex-shrink-1"/>
            </v-col>
          </v-row>
        </v-col>
        <v-snackbar v-if="snackbar.value" v-model="snackbar.value" color="red" top right>{{snackbar.message}}</v-snackbar>
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
      snackbar: {
        value: false,
        message: '',
        color: ''
      }
    }
  },
  async mounted () {
    // this.user = await JSON.parse(localStorage.getItem('profile'))
    this.user = await this.$store.state.user ? this.$store.state.user : 'Ziyaretçi'
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
        this.snackbar.message = 'Şifre başarıyla değiştirildi'
        this.snackbar.value = true
        setTimeout(() => { this.snackbar.value = false }, 5000)
      } catch (err) {
        console.log(err)
        this.snackbar.message = String(err.response.data)
        this.snackbar.value = true
        setTimeout(() => { this.snackbar.value = false }, 5000)
      }
    },
    changeEmail (payload) {
      this.email = payload
    }
  }
}
</script>

<style scoped>
.v-col {
  max-width: 50%;
}
</style>
