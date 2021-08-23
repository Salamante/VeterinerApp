<template>
<div class="table-text">
    <v-toolbar
      dense
      flat
      class="mt-10 mb-10"
      color="#00355e"
      dark
    >
      <v-toolbar-title>
        <v-icon large class="mr-4">mdi-account-multiple</v-icon>
        Müşteriler
      </v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="customers"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="first_name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="text-start">
            <v-col cols="3" class="ml-16">
              <h3>{{item.first_name}} {{item.last_name}}</h3>
              <h3>{{item.description}}</h3>
              <h3>Ver.Kim.No: {{item.tax_vkn_number}}</h3>
            </v-col>
            <v-col>
              <h3>{{item.address}}</h3>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
</div>
</template>

<script>
import CustomerService from '@/services/CustomerService'
export default {
  data () {
    return {
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: `İsim`,
          align: 'start',
          sortable: true,
          value: 'first_name',
          class: 'text-h7 font-weight-bold'
        },
        { text: 'Email', value: 'email', class: 'font-weight-bold text-h7' },
        { text: 'Telefon', value: 'phone', class: 'font-weight-bold text-h7' },
        { text: 'Şehir', value: 'city.name', class: 'font-weight-bold text-h7' },
        { text: 'Hayvan', value: 'district.name', class: 'font-weight-bold text-h7' },
        { text: '', value: 'data-table-expand', class: 'font-weight-bold text-h7' }
      ],
      customers: []
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        const response = (await CustomerService.getAllCustomers()).data
        response.forEach(element => {
          this.customers.push(element)
        })
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.table-text
  font-family: 'Mitr', sans-serif
</style>
