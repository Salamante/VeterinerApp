<template>
  <v-container>
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
        <td :colspan="headers.length">More info about {{ item.first_name }}</td>
      </template>
    </v-data-table>
  </v-container>
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
          class: 'text-h5 black--text font-weight-bold'
        },
        { text: 'Email', value: 'email', class: 'font-weight-bold text-h6' },
        { text: 'Telefon', value: 'phone', class: 'font-weight-bold text-h6' },
        { text: 'Şehir', value: 'city.name', class: 'font-weight-bold text-h6' },
        { text: 'Hayvan', value: 'district.name', class: 'font-weight-bold text-h6' },
        { text: '', value: 'data-table-expand', class: 'font-weight-bold text-h6' }
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

<style lang="sass">

</style>
