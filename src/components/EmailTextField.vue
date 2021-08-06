<template>
  <div>
    <v-col>
      <v-text-field
        v-model="email"
        outlined
        clearable
        :label="label"
        type="text"
        :rules="[rules.required, rules.email]"
        hint="test@gmail.com"
        v-on:input="$emit('input', $event)"
      ></v-text-field>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: 'Email'
    }
  },
  data () {
    return {
      email: '',
      rules: {
        required: true,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Geçersiz email.'
        }
      }
    }
  },
  computed: {
    test () {
      return this.$emit('update:email', this.email)
    }
  }
}
</script>
