<template>
  <div id="main-container" class="d-flex flex-row">
    <div class="flex-grow-1">
      <customer-table />
    </div>
  </div>
</template>

<script>
import CustomerTable from '../components/CustomerTable.vue'
export default {
  name: 'Home',
  components: {
    CustomerTable
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

</style>
