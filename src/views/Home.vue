<template>
  <div id="main-container" class="d-flex flex-row">
      <!-- <main-bar @menuClicked="MenuSwitch" /> -->
    <div class="flex-grow-1">
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
      isMini: false
    }
  },
  methods: {
    MenuSwitch () {
      this.isMini = !this.isMini
      console.log(this.isMini)
    }
  }
}
</script>

<style scoped>
.left-margin {
  margin-left: 256px;
}
.menu-small {
  margin-left:50px;
}
</style>
