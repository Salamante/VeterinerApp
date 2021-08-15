<template>
  <div class="body">
   <div id="main-container" class="d-flex flex-row main-container">
    <div class="flex-grow-1">
      <v-toolbar
        prominent
        flat
        class="mt-10"
        color="#ad4b4b"
        dark
      >
        <v-toolbar-title class="align-self-center text-h3">
          DASHBOARD
        </v-toolbar-title>
        </v-toolbar>
      <v-container class="d-flex flex-row" >
        <customer-card class="flex-grow-1"/>
        <alert-card class="flex-grow-1"/>
        <upcoming-appointments-card class="flex-grow-0"/>
      </v-container>
      <v-toolbar
        dense
        flat
        class="mt-10"
        color="#ad4b4b"
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
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 1080px;
  background: #ee9ca7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffdde1, #ee9ca7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.main-container {
  min-height: 1080px;
  margin-top: 60px;
}
.dashboard-card {
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px rgb(196, 196, 196) solid;
  border-top: 1px rgb(196, 196, 196) solid;
}

</style>
