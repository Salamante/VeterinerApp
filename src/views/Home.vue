<template>
  <div class="body">
   <div id="main-container" class="d-flex flex-row">
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
      <v-container>
        <v-toolbar
          dense
          flat
          class="mt-10 mb-10"
          color="#ad4b4b"
          dark
        >
          <v-toolbar-title>
            <v-icon large class="mr-4">mdi-account-multiple</v-icon>
            Müşteriler
          </v-toolbar-title>
        </v-toolbar>
        <customer-expandable-table />
        <animal-table />
        <product-table />
      </v-container>
      <footer-bar />
    </div>
   </div>
  </div>
</template>

<script>
import AlertCard from '../components/AlertCard.vue'
import AnimalTable from '../components/AnimalTable.vue'
import CustomerCard from '../components/CustomerCard.vue'
import CustomerExpandableTable from '../components/CustomerExpandableTable.vue'
import FooterBar from '../components/Footer.vue'
import ProductTable from '../components/ProductTable.vue'
import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard.vue'
export default {
  name: 'Home',
  components: {
    CustomerExpandableTable,
    CustomerCard,
    AlertCard,
    FooterBar,
    UpcomingAppointmentsCard,
    AnimalTable,
    ProductTable
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
  min-height: 150vh;
  height: 250vh;
  background: #d7dadb;  /* fallback for old browsers */
}
.dashboard-card {
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px rgb(196, 196, 196) solid;
  border-top: 1px rgb(196, 196, 196) solid;
}

</style>
