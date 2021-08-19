<template>
 <div class="body">
   <v-container>
    <animal-table @popSnackbar="popSnackbar"/>
   </v-container>
 </div>
</template>

<script>
import AnimalTable from '../components/AnimalTable.vue'

export default {
  components: {
    AnimalTable
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
  top: 0 !important;
  margin: 0;
  padding: 0;
  min-height: 150vh;
  height: 100vh;
  background: #d7dadb;  /* fallback for old browsers */
}
</style>
