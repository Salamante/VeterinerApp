<template>
<v-container>
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
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="İsim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Soyisim"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Telefon"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tax_vkn_number"
                      label="Tax VKN Numarası"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tax_office"
                      label="Vergi Dairesi"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.district"
                      type="number"
                      label="district"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.city"
                      type="number"
                      label="şehir"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="Adres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</v-container>
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
        value: 'first_name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Telefon', value: 'phone' },
      { text: 'Şehir', value: 'city.name' },
      { text: 'District', value: 'district.name' },
      { text: 'Actions', value: 'actions', sortable: false }
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
    // this.initialize()
  },

  methods: {
    initialize () {
      this.customers = []
    },

    editItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.customers.splice(this.editedIndex, 1)
      this.closeDelete()
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      // try {
      //   const response = await CustomerService.createCustomer(this.customer)
      //   console.log(response)
      // } catch (err) {
      //   console.log(err.response.data)
      // }
      this.close()
    }
  }
}
</script>
