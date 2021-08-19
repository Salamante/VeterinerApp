<template>
<div>
    <v-list
            class="text-start secondary--text"
        >
            <v-list-item
            :to="{name: 'Home'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Dashboard</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Customers'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Müşteriler</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Animals'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-cat</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Hayvanlar</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Products'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-pharmacy</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Ürünler</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Appointments'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-calendar-month</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Randevular</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Profile'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Profil</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-divider class="divider"></v-divider>

            <v-list-item
            v-if="!this.$store.state.isUserLoggedIn"
            link
            :to="{name: 'Login'}"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Giriş Yap</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            v-if="isLogged"
            link
            @click="logout"
            >
            <v-list-item-icon>
                <v-icon color="secondary">mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="secondary--text">Çıkış Yap</v-list-item-title>
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
.divider {
  background: secondary;
}
</style>
