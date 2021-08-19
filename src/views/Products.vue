<template>
 <div class="body">
     <v-container>
        <product-table @popSnackbar="popSnackbar"/>
     </v-container>
 </div>
</template>

<script>
import ProductTable from '../components/ProductTable.vue'

export default {
  components: {
    ProductTable
  },
  methods: {
    popSnackbar (payload) {
      this.$emit('popSnackbar', payload)
    }
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
  height: 100vh;
  background: #d7dadb;
}
</style>
