<template>
  <div class="main-container">
    <v-toolbar
          dense
          flat
          color="#00355e"
          dark
          class="mb-10"
        >
          <v-toolbar-title>
            <v-icon large class="mr-4">mdi-account-group</v-icon>
            Müşteriler
          </v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="first_name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>MÜŞTERİLER</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mr-10"
        ></v-text-field>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2 ml-10"
                v-bind="attrs"
                v-on="on"
              >
                Müşteri Ekle
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.first_name"
                        label="İsim"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.last_name"
                        label="Soyisim"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Telefon"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="email"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.tax_vkn_number"
                        label="Tax VKN Numarası"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.tax_office"
                        label="Vergi Dairesi"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.district"
                        type="number"
                        label="district"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.city"
                        type="number"
                        label="şehir"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.address"
                        label="Adres"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                        sm="24"
                        md="12"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Açıklama"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  İptal
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Kaydet
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService'

export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Müşteri',
        align: 'start',
        sortable: false,
        value: 'first_name',
        class: 'text-h7'
      },
      { text: 'Email', value: 'email', class: 'text-h7' },
      { text: 'Telefon', value: 'phone', class: 'text-h7' },
      { text: 'Şehir', value: 'city.name', class: 'text-h7' },
      { text: 'District', value: 'district.name', class: 'text-h7' },
      { text: 'Actions', value: 'actions', sortable: false, class: 'text-h7' }
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      description: '',
      tax_vkn_number: '',
      tax_office: '',
      address: '',
      district: Number(this.district),
      city: Number(this.city)
    },
    defaultItem: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      description: '',
      tax_vkn_number: '',
      tax_office: '',
      address: '',
      district: Number(this.district),
      city: Number(this.city)
    }
  }),
  async mounted () {
    const res = await CustomerService.getCustomer(5)
    console.log(res.data)
  },
  computed: {
    customer () {
      return this.editedItem
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Yeni Müşteri' : 'Müşteriyi Güncelle'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      try {
        const response = (await CustomerService.getAllCustomers()).data
        response.forEach(element => {
          this.customers.push(element)
        })
        console.log(this.customers)
      } catch (err) {
        console.log(err.response)
      }
    },

    editItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await CustomerService.deleteCustomer(this.editedIndex)
        console.log(response.data)
        this.closeDelete()
        this.$nextTick(() => {
          window.location.reload()
        })
      } catch (err) {
        console.log(err.response)
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
    },

    async save () {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = (await CustomerService.createCustomer(this.customer)).data
        this.$emit('popSnackbar', {color: 'green', message: 'Yeni müşteri eklendi!'})
      } catch (err) {
        console.log(err.response.data)
        this.$emit('popSnackbar', {color: 'red', message: err.response.data})
      }
      this.close()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-container
  font-family: 'Mitr', sans-serif
</style>
