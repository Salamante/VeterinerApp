<template>
    <div id="main-container d-flex flex-row">
      <v-container>
        <not-logged-in-profile v-if="!this.$store.state.isUserLoggedIn"/>
        <profile-card :name="this.user.name" v-if="this.$store.state.isUserLoggedIn"/>
        <edit-profile v-if="this.$store.state.isUserLoggedIn" @submit="submit"/>
        <edit-password v-if="this.$store.state.isUserLoggedIn" @changePass="changePass" />
        <v-snackbar v-model="snackbar" color="red" top rounded="pill">Şifre değiştirme başarılı!</v-snackbar>
      </v-container>
    </div>
</template>

<script>
import EditProfile from '../components/EditProfile.vue'
import MainBar from '../components/MainBar.vue'
import NotLoggedInProfile from '../components/NotLoggedInProfile.vue'
import ProfileCard from '../components/ProfileCard.vue'
import AuthenticationService from '@/services/AuthenticationService'
import EditPassword from '../components/EditPassword.vue'
export default {
  components: {
    MainBar,
    ProfileCard,
    EditProfile,
    NotLoggedInProfile,
    EditPassword
  },
  data () {
    return {
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
        await AuthenticationService.patchUserProfile(this.nameToChange)
      } catch (err) {
        console.log(err)
      }
    },
    async changePass (payload) {
      this.oldPass = payload.emitedPassword
      this.newPass = payload.emitedNewPassword
      try {
        await AuthenticationService.changePassword(this.oldPass, this.newPass)
        this.snackbar.value = true
        setTimeout(() => { this.snackbar.value = false }, 2000)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
