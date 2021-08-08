<template>
  <v-row>
    <v-col cols="12">
      <h3 class="text-start ml-9 mb-2">{{ title }}</h3>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        counter
        :type="show1 ? 'text' : 'password'"
        :label="title.password"
        :placeholder="placeholder"
        :rules="[rules.required]"
        @click:append="show1 = !show1"
        v-on:input="$emit('input', $event)"
      >
        <template v-slot:prepend>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-head-question-outline
              </v-icon>
            </template>
            {{ tooltip }}
          </v-tooltip>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    placeholder: {
      default: 'placeholder'
    },
    tooltip: {
      default: 'parola'
    },
    title: {
      default: 'Parola'
    }
  },
  data: () => ({
    password: null,
    show1: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters'
    }
  }),
  methods: {
    clearField () {
      this.password = ''
    }
  },
  created: function () {
    this.$on('clearField', this.clearField)
  }
}
</script>
