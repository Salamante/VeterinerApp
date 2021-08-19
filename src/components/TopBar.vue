<template>
<div class="toolbar">
  <v-toolbar
    class="toolbar-position toolbar"
    :class="{'small-menu': $store.state.MainBar.isMini, 'no-menu': $vuetify.breakpoint.mobile}"
    elevation="1"
    color="white"
    :width="$vuetify.breakpoint.width"
    >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            class="search-field"
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn text plain class="mr-3 profile-button" v-bind="attrs" v-on="on">
                    <v-avatar class="mr-5" size="20" round>
                        <v-img
                        src="https://www.vscnl.ca/wp-content/uploads/2020/06/Dr-Laura-Rogers-Avatar-FAA.png"
                        ></v-img>
                    </v-avatar>
                    <span class="list-hover">{{name}}</span>
                </v-btn>
            </template>
            <v-list class="text-start mt-1">
                <v-list-item link dense :disabled="this.$store.state.User.isUserLoggedIn">
                    <v-list-item-title><v-icon class="mr-3" color="black" small>mdi-account</v-icon>My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item link dense class="list-hover">
                    <v-list-item-title><v-icon class="mr-3" color="black" small>mdi-cog</v-icon>Settings</v-list-item-title>
                </v-list-item>
                <v-list-item link dense class="list-hover">
                    <v-list-item-title><v-icon class="mr-3" color="black" small>mdi-mail</v-icon>Messages</v-list-item-title>
                </v-list-item>
                <v-list-item link dense class="list-hover" v-if="this.$store.state.User.isUserLoggedIn">
                    <v-divider></v-divider>
                    <v-list-item-title><v-icon class="mr-3" color="black" small>mdi-logout</v-icon>Log Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-divider vertical></v-divider>
        <v-btn icon class="mr-3 ml-3 list-hover">
          <v-badge color="red" content="7">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn v-if="this.$store.state.isUserLoggedIn" icon class="list-hover ml-2">
        <v-icon >mdi-logout</v-icon>
      </v-btn>
  </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: null
    }
  },
  created () {
    console.log(this.$store.state.isUserLoggedIn)
    if (this.$store.state.user) {
      this.name = this.$store.state.user.name
    } else {
      this.name = 'Ziyaretçi'
    }
  }
}
</script>

<style scoped>
.toolbar {
  border-bottom: 1px rgb(196, 196, 196) solid;
  display: block;
}
.small-menu {
    margin-left: 56px !important;
    padding-right: 56px !important
}
.no-menu {
  margin-left: 0px;
  padding-right: 0px;
}
.search-field {
    max-width: 250px;
}
.profile-button {
    width: 160px;
    min-height: 60px;
}
.list-hover:hover {
  color: blue !important;
}
</style>
