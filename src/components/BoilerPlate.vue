<template>
  <div class="small mx-auto mt-16">
    <bar :data="dataCollection" />
  </div>
</template>

<script>
import Bar from './InfoChart.js'

export default {
  components: {
    Bar
  },
  data () {
    return {
      dataCollection: {
        labels: ['What', 'DaFcuk'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [23, 43]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [22, 13]
          }
        ]
      }
    }
  }
}
</script>

<style>
  .small {
    width: 250px;
  }
</style>
