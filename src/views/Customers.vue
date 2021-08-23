<template>
<div class="body">
  <v-container>
    <customer-table @popSnackbar="popSnackbar"/>
  </v-container>
</div>
</template>

<script>
import CustomerTable from '../components/CustomerTable.vue'

export default {
  components: {CustomerTable},
  data () {
    return {

    }
  },
  async mounted () {
    console.log(this.$route.params.id)
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
  height: 100vh;
  min-height: 160vh;
  background: #d7dadb;  /* fallback for old browsers */
}
.main-container {
  margin-top: 60px;
}
</style>
