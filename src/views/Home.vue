<template>
  <div id="main-container">
    <main-bar />
    <div :class="{ 'left-margin': !this.$vuetify.breakpoint.mobile }">
      <customer-table />
    </div>
  </div>
</template>

<script>
import CustomerTable from '../components/CustomerTable.vue'
import MainBar from '../components/MainBar.vue'
export default {
  name: 'Home',
  components: {
    MainBar,
    CustomerTable
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.left-margin {
  margin-left: 256px;
}
</style>
