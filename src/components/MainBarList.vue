<template>
<div class="font">
    <v-list
            class="text-start"
        >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
          >
            <v-list-item
            :to="{name: 'Home'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Dashboard</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Customers'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Müşteriler</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Animals'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-cat</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Hayvanlar</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Products'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-pharmacy</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Ürünler</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Appointments'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-calendar-month</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Randevular</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            :to="{name: 'Profile'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Profil</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-divider class="divider"></v-divider>

            <v-list-item
            v-if="!this.$store.state.isUserLoggedIn"
            link
            :to="{name: 'Login'}"
            >
            <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Giriş Yap</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-list-item
            v-if="isLogged"
            link
            @click="logout"
            >
            <v-list-item-icon>
                <v-icon >mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="text-h7">Çıkış Yap</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
        </v-list>
        </div>
</template>

<script>
export default {
  data () {
    return {
      selectedItem: 0,
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
    font-family: 'Mitr', sans-serif;
}
.divider {
  background: secondary;
}
</style>
