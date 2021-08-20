<template>
<div>
    <sales-chart :data="dataSales" :options="options" />
</div>
</template>

<script>
import SalesChart from './SalesChart.js'
let width, height, gradient
function getGradient (ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, 'rgba(128, 182, 244, 0.6)')
    gradient.addColorStop(1, 'rgba(244, 144, 128, 0.6)')
  }

  return gradient
}

export default {
  components: {
    SalesChart
  },
  data () {
    return {
      dataSales: {
        labels: ['Ürün', 'Muayene', 'Ameliyat', 'Diğer'],
        datasets: [
          {
            label: 'Adet',
            data: [46, 34, 12, 44],
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#ffffff'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              beginAtZero: true
            },
            display: false,
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            }
          }]
        },
        elements: {
          line: {
            fill: true,
            borderColor: '#00eaff',
            backgroundColor: function (context) {
              const chart = context.chart
              const {ctx, chartArea} = chart

              if (!chartArea) {
                return null
              }
              return getGradient(ctx, chartArea)
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
