<template>
<div>
    <v-list
            dense
            nav
            class="text-start"
        >
            <v-list-item
            link
            :to="{name: 'Home'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            link
            :to="{name: 'Customers'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Müşteriler</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            link
            :to="{name: 'Profile'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Profil</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            v-if="!this.$store.state.isUserLoggedIn"
            link
            :to="{name: 'Login'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Giriş Yap</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            v-if="isLogged"
            link
            @click="logout"
            >
            <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Çıkış Yap</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </div>
</template>

<script>
export default {
  data () {
    return {
      isLogged: this.$store.state.isUserLoggedIn
    }
  },
  methods: {
    logout () {
      window.location.reload()
      this.$emit('loggedOut')
      this.$router.push({name: 'Login'})
    }
  }

}
</script>

<style scoped>
.font {
  font-family: Arial, Helvetica, sans-serif ;
}
</style>
