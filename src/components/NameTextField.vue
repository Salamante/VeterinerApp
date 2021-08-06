<template>
  <div>
    <v-col>
      <v-text-field
        v-model="email"
        outlined
        clearable
        :label="label"
        type="text"
        :rules="[rules.required]"
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
        required: true
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
