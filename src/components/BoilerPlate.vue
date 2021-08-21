<template>
  <div id="google-signin-button"></div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    let date = '2021-01-26'
    console.log(this.formatDate(date))
  },
  methods: {
    formatDate (date) {
      const arr = date.split('-').splice(1, 2)
      const dayNum = arr[1]
      console.log(dayNum)
      let dayText = ''
      switch (arr[0]) {
        case '01':
          dayText = 'Ocak'
          break
        case '02':
          dayText = 'Şubat'
          break
        case '03':
          dayText = 'Mart'
          break
        case '04':
          dayText = 'Nisan'
          break
        case '05':
          dayText = 'Mayıs'
          break
        case '06':
          dayText = 'Haziran'
          break
        case '07':
          dayText = 'Temmuz'
          break
        case '08':
          dayText = 'Ağustos'
          break
        case '09':
          dayText = 'Eylül'
          break
        case '10':
          dayText = 'Ekim'
          break
        case '11':
          dayText = 'Kasım'
          break
        case '12':
          dayText = 'Aralık'
          break
        default:
          dayText = 'Object Object'
          break
      }
      return `${dayNum} ${dayText}`
    }
  }
}
</script>
