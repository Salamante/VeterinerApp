<template>
    <div>
        <h1>İsim: {{ this.user.name }}</h1>
        <h1>Email: {{ this.user.email }}</h1>
        <h1>Telefon: {{ this.user.phone }}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: null,
      bool: false
    }
  },
  async mounted () {
    this.user = await this.$store.state.user
  },
  methods: {
  }
}
</script>
