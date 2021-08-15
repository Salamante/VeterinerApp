<template>
  <div id="main-container" class="d-flex flex-row main-container">
    <div class="flex-grow-1">
      <v-toolbar
        prominent
        flat
        class="mt-10"
        color="secondary"
        dark
      >
        <v-toolbar-title class="align-self-center text-h3">
          DASHBOARD
        </v-toolbar-title>
        </v-toolbar>
      <v-container class="d-flex flex-row" >
        <v-col>
          <customer-card />
        </v-col>
        <v-col>
          <alert-card />
        </v-col>
          <v-col>
          <upcoming-appointments-card />
        </v-col>
      </v-container>
      <v-toolbar
        dense
        flat
        class="mt-10"
        color="primary"
        dark
      >
        <v-toolbar-title>
          <v-icon large class="mr-4">mdi-account-multiple</v-icon>
          Müşteriler
        </v-toolbar-title>
      </v-toolbar>
      <customer-expandable-table />
      <footer-bar />
    </div>
  </div>
</template>

<script>
import AlertCard from '../components/AlertCard.vue'
import CustomerCard from '../components/CustomerCard.vue'
import CustomerExpandableTable from '../components/CustomerExpandableTable.vue'
import FooterBar from '../components/Footer.vue'
import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard.vue'
export default {
  name: 'Home',
  components: {
    CustomerExpandableTable,
    CustomerCard,
    AlertCard,
    FooterBar,
    UpcomingAppointmentsCard
  },
  data () {
    return {
    }
  },
  methods: {
  }
}

</script>

<style scoped>
.main-container {
  background: rgb(223, 223, 223);
  min-height: 1080px;
}
.dashboard-card {
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px rgb(196, 196, 196) solid;
  border-top: 1px rgb(196, 196, 196) solid;
}

</style>
