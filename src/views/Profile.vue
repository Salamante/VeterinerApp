<template>
  <div class="body">
    <div class="main-container d-flex flex-row">
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
        const response = (await AuthenticationService.changeUserName(this.nameToChange)).data
        this.$emit('popSnackbar', {color: 'green', message: response})
      } catch (err) {
        this.$emit('popSnackbar', {color: 'red', message: err.response.data.detail})
        console.log(err.response.data.detail)
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
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding-top: 0;
  min-height: 1080px;
  background: #2980B9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.main-container {
  margin-top: 60px;
}
.v-col {
  max-width: 50%;
}
</style>
