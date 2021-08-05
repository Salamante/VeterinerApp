<template>
        <v-card
          width="50%"
          height="500"
          elevation="2"
          outlined
          class="mx-auto mt-10"
        >
          <v-card-title class="title font-weight-black">
              <v-icon large class="mr-5">mdi-wrench</v-icon>
              Parola Değiştir
          </v-card-title>
          <v-divider class="mt-4 mb-6"></v-divider>
          <v-form>
            <v-container>
            <v-row>
                <v-col cols="12">
                <h3 class="text-start ml-9 mb-2">{{title.password}}</h3>
                <v-text-field
                    v-model="password"
                    outlined
                    clearable
                    :label="title.password"
                    type="password"
                    :placeholder="placeholder.passwordPlaceholder"
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
                        {{ tooltip.passwordTooltip }}
                    </v-tooltip>
                    </template>
                </v-text-field>
                </v-col>

                <v-col cols="12">
                <h3 class="text-start ml-9 mb-2">{{title.newPassword}}</h3>
                <v-text-field
                    v-model="newPassword"
                    outlined
                    clearable
                    :label="title.newPassword"
                    type="password"
                    :placeholder="placeholder.newPasswordPlaceholder"
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
                        {{tooltip.newPasswordTooltip}}
                    </v-tooltip>
                    </template>
                </v-text-field>
                </v-col>
            </v-row>
            </v-container>
            <v-divider class="mb-4 mt-2"></v-divider>
            <div id="button-container" class="d-flex ml-6">
                <v-btn type="submit" dark class="mt-2" color="light-blue accent-4" @click="submit">güncelle</v-btn>
                <v-btn dark class="mt-2 ml-4" @click="clearForm">Formu Resetle</v-btn>
            </div>
          </v-form>
        </v-card>
</template>

<script>
export default {
  data: () => ({
    password: null,
    newPassword: null,
    form: {
      emitedPassword: '',
      emitedNewPassword: ''
    },
    rules: 'Required',
    placeholder: {
      passwordPlaceholder: 'şifrenizi girin',
      newPasswordPlaceholder: 'Yeni parolayı girin'
    },
    tooltip: {
      passwordTooltip: 'Değiştirmek istediğiniz parolayı giriniz',
      newPasswordTooltip: 'Yeni parolanızı girin'
    },
    title: {
      password: 'şifre',
      newPassword: 'Yeni şifre'
    },
    headTitle: {
      password: 'şifre',
      newPassword: 'Yeni şifre'
    }

  }),
  methods: {
    clearForm () {
      this.password = ''
      this.newPassword = ''
    },
    submit () {
      this.form.emitedPassword = this.password
      this.form.emitedNewPassword = this.newPassword
      this.$emit('changePass', this.form)
      console.log(this.form.emitedPassword + ' ' + this.form.emitedNewPassword)
    }
  }
}
</script>
