<template>
  <div class="body">
   <div id="main-container" class="d-flex flex-row">
    <div class="flex-grow-1">
      <v-container class="mt-15">
        <v-row>
          <v-col cols="12">
            <v-sheet
              color="#00355e"
              elevation="1"
              height="400"
              width="auto"
            >
              <div class="sale-header">
                <v-row>
                  <v-col cols="4">
                    <h2 class="white--text text-start ml-5 mt-4 mb-5">Satışlar</h2>
                    <h1 class="white--text text-start ml-5">17,250.00 ₺</h1>
                    <h4 class="blue--text text-start ml-5">21,340.00 ₺ (son hafta)</h4>
                  </v-col>
                  <v-col>
                    <v-row justify="end">
                        <v-btn
                          plain
                          dark
                          class="mt-5 mr-5 blue--text btn-text"
                        >
                          Raporu İncele
                        </v-btn>
                    </v-row>
                    <v-row justify="end">
                      <h4 class="mr-10 mt-15">
                        <v-icon color="#06cb9c">mdi-arrow-top-right-thick</v-icon>
                        <span>27%</span>
                      </h4>
                    </v-row>
                    <v-row justify="end">
                      <h6 class="mr-10 white--text">
                        geçtiğimiz haftaya göre
                      </h6>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
              <div class="sale-chart">
                <sales-sheet />
              </div>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-sheet
              color="white"
              elevation="1"
              height="400"
              width="auto"
            >
              <h3 class="text-start ml-5 pt-5 mb-4 secondary--text">Yaklaşan Randevular</h3>
              <appointments-slide />
            </v-sheet>
          </v-col>
          <v-col cols="6">
            <v-sheet
              color="white"
              elevation="1"
              height="400"
              width="auto"
            >
              <h3 class="text-start ml-5 pt-5 mb-4 secondary--text">Hasta Portfolyosu</h3>
              <div class="chart ml-4">
                <info-chart :data="dataCollection" :options="options"/>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
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
import AppointmentsSlide from '../components/AppointmentsSlide.vue'
import CustomerCard from '../components/CustomerCard.vue'
import CustomerExpandableTable from '../components/CustomerExpandableTable.vue'
import FooterBar from '../components/Footer.vue'
import ProductTable from '../components/ProductTable.vue'
import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard.vue'
import InfoChart from '../components/InfoChart.js'
import SalesSheet from '../components/SalesSheet.vue'
export default {
  name: 'Home',
  components: {
    CustomerExpandableTable,
    CustomerCard,
    AlertCard,
    FooterBar,
    UpcomingAppointmentsCard,
    AnimalTable,
    ProductTable,
    AppointmentsSlide,
    InfoChart,
    SalesSheet
  },
  data () {
    return {
      options: {
        responsive: true,
        legend: {
          position: 'right'
        }
      },
      dataCollection: {
        labels: ['Kedi', 'Köpek', 'Kuş', 'Diğer'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#f23979', '#abf5b2', '#d7abf5', '#eef5ab'],
            data: [46, 34, 12, 8]
          }
        ]
      }
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
  height: 270vh;
  background: #d7dadb;
}
h2, h4, h1, h6, h3 {
  font-family: 'Poiret One', cursive;
  letter-spacing: 0.1em;
}
h4 span {
  color: #06cb9c;
  font-family: 'Arial';
}
.dashboard-card {
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px rgb(196, 196, 196) solid;
  border-top: 1px rgb(196, 196, 196) solid;
}
.chart {
  width: 300px;
}
.sale-chart {
  height: 400px;
}
.sale-header {
  position: absolute;
  min-width: 1623px;
}
</style>
