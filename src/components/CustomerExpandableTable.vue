<template>
    <v-data-table
      :headers="headers"
      :items="customers"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="first_name"
      show-expand
      class="elevation-1 data-table-text"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.first_name }}</td>
      </template>
    </v-data-table>
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
        console.log(this.customers)
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.data-table-text
  font-family: 'Russo One'
</style>
