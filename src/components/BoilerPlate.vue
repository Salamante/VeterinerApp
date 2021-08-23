<template>
  <div>

  </div>
</template>

<script>
// import PrefetchService from '@/services/PrefetchService.js'
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.getAnimalName(4))
  },
  methods: {
    getAnimalName (id) {
      const animals = this.$store.state.Animals.animals
      // eslint-disable-next-line eqeqeq
      return (animals.find(o => o.id == id)).name
    }
  }
}
</script>
