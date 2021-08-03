<template>
  <v-responsive :aspect-ratio="16/9">
    <v-container class="mt-15">
      <h1>customers</h1>
      <br />
      <br />
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
          <v-card>
            <v-card-text v-for="item in customers" :key="item.id">
                {{ item.customer_name }}
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
import CustomersService from '@/services/CustomersService'

export default {
  data () {
    return {
      customers: null,
      test: [
        { name: 'keko', id: 1 },
        { name: 'memo', id: 2 }
      ]
    }
  },
  async mounted () {
    this.customers = (await CustomersService.index()).data
  },
  methods: {
  }
}

</script>

<style scoped>

</style>
