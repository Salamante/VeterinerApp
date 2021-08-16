<template>
 <div class="body">
   <animal-table @popSnackbar="popSnackbar"/>
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
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #C6FFDD;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
