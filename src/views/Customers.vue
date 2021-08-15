<template>
<div class="body">
  <customer-table />
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
  },
  methods: {

  }
}

</script>

<style scoped>
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 1080px;
  background: #C6FFDD;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
