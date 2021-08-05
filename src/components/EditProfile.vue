<template>
        <v-card
          width="50%"
          height="500"
          elevation="2"
          outlined
          class="mx-auto mt-10"
        >
          <v-card-title class="title font-weight-black">
              <v-icon large class="mr-5">mdi-account-circle</v-icon>
              Profili Düzenle
          </v-card-title>
          <v-divider class="mt-4 mb-6"></v-divider>
          <v-form>
            <v-container>
            <v-row>
                <v-col cols="12">
                <h3 class="text-start ml-9 mb-2">{{title.name}}</h3>
                <v-text-field
                    v-model="name"
                    outlined
                    clearable
                    :label="title.name"
                    type="text"
                    :placeholder="placeholder.namePlaceholder"
                    :rules="[rules]"
                >
                    <template v-slot:prepend>
                    <v-tooltip
                        bottom
                    >
                        <template v-slot:activator="{ on }">
                        <v-icon v-on="on">
                            mdi-head-question-outline
                        </v-icon>
                        </template>
                        {{ tooltip.nameTooltip }}
                    </v-tooltip>
                    </template>
                </v-text-field>
                </v-col>

                <v-col cols="12">
                <h3 class="text-start ml-9 mb-2">{{title.email}}</h3>
                <v-text-field
                    v-model="email"
                    outlined
                    clearable
                    :label="title.email"
                    type="text"
                    :placeholder="placeholder.emailPlaceholder"
                    :rules="[rules]"
                >
                    <template v-slot:prepend>
                    <v-tooltip
                        bottom
                    >
                        <template v-slot:activator="{ on }">
                        <v-icon v-on="on">
                            mdi-head-question-outline
                        </v-icon>
                        </template>
                        {{tooltip.emailTooltip}}
                    </v-tooltip>
                    </template>
                </v-text-field>
                </v-col>
            </v-row>
            </v-container>
            <v-divider class="mb-4 mt-2"></v-divider>
            <div id="button-container" class="d-flex ml-6">
                <v-btn type="submit" dark class="mt-2" color="light-blue accent-4" @click="submit">Güncelle</v-btn>
                <v-btn dark class="mt-2 ml-4" @click="clearForm">Formu Resetle</v-btn>
            </div>
          </v-form>
        </v-card>
</template>

<script>
export default {
  data: () => ({
    name: null,
    email: null,
    form: {
      emitedName: '',
      emitedEmail: ''
    },
    rules: 'Required',
    placeholder: {
      namePlaceholder: 'isminizi girin',
      emailPlaceholder: 'Email ınızı girin'
    },
    tooltip: {
      nameTooltip: 'Değiştirmek istediğiniz ismi giriniz',
      emailTooltip: 'Değiştirmek istediğiniz email ı giriniz'
    },
    title: {
      name: 'İsim',
      email: 'Email'
    },
    headTitle: {
      name: 'İsim',
      email: 'E-mail'
    }

  }),
  methods: {
    clearForm () {
      this.name = ''
      this.email = ''
    },
    submit () {
      this.form.emitedName = this.name
      this.form.emitedEmail = this.email
      this.$emit('submit', this.form)
      console.log(this.form.emitedName + ' ' + this.form.emitedEmail)
    }
  }
}
</script>
