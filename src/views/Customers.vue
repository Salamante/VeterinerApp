<template>
<div>
  <edit-profile @submit="submit"/>
  <h1>{{ this.name }}</h1>
  <h1>{{ this.email }}</h1>
</div>
</template>

<script>
import EditProfile from '../components/EditProfile.vue'

export default {
  components: { EditProfile },
  data () {
    return {
      name: '',
      email: ''
    }
  },
  async mounted () {
  },
  methods: {
    submit (payload) {
      this.name = payload.emitedName
      this.email = payload.emitedEmail
      console.log(this.name + ' ' + this.email)
    }
  }
}

</script>

<style scoped>

</style>
