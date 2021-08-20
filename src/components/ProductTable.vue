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
          <v-icon large class="mr-4">mdi-pharmacy</v-icon>
          Ürünler
        </v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="sales_price"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>ÜRÜNLER</v-toolbar-title>
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
              ><v-icon>mdi-plus</v-icon>
                Ürün Ekle
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
                        v-model="editedItem.name"
                        label="İsim"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                    <v-select
                      v-model="editedItem.unit"
                      :items="units"
                      item-text="name"
                      item-value="id"
                      label="Birim"
                      persistent-hint
                      single-line
                    ></v-select>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-select
                        v-model="editedItem.type"
                        :items="productTypes"
                        item-text="name"
                        item-value="id"
                        label="Ürün Tipi"
                        persistent-hint
                        single-line
                    ></v-select>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        v-model="editedItem.barcode"
                        label="Barkod"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        v-model="editedItem.code"
                        label="Kod"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        prefix="$"
                        v-model="editedItem.sales_price"
                        label="Satış fiyatı"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        prefix="$"
                        v-model="editedItem.purchase_price"
                        type="number"
                        label="Alış fiyatı"
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
import ProductService from '@/services/ProductService'
import CommonService from '@/services/CommonService'

export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'İsim',
        align: 'start',
        sortable: false,
        value: 'name',
        class: 'text-h7 font-weight-bold'
      },
      { text: 'Stok Durumu', value: 'stock', class: 'text-h7 font-weight-bold' },
      { text: 'Birim', value: 'unitName', class: 'text-h7 font-weight-bold' },
      { text: 'Barkod', value: 'barcode', class: 'text-h7 font-weight-bold' },
      { text: 'Satış Fiyatı($)', value: 'sales_price', class: 'text-h7 font-weight-bold' },
      { text: 'Alış Fiyatı', value: 'purchase_price', class: 'text-h7 font-weight-bold' },
      { text: 'Actions', value: 'actions', sortable: false, class: 'text-h7 font-weight-bold' }
    ],
    products: [],
    units: [],
    productTypes: [],
    selectUnit: null,
    selectProductType: null,
    editedIndex: -1,
    editedItem: {
      name: '',
      unit: Number(this.unit),
      type: Number(this.type),
      barcode: '',
      code: '',
      sales_price: '',
      purchase_price: ''
    },
    defaultItem: {
      name: '',
      unit: Number(this.unit),
      type: Number(this.type),
      barcode: '',
      code: '',
      sales_price: '',
      purchase_price: ''
    }
  }),
  async mounted () {

  },
  computed: {
    product () {
      return this.editedItem
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Yeni Ürün' : 'Ürün Güncelle'
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
        const productResponse = (await ProductService.getAllProducts()).data
        const unitResponse = (await CommonService.getUnits()).data
        this.productTypes = (await CommonService.getProductTypes()).data
        productResponse.forEach(product => {
          unitResponse.forEach(unit => {
            this.units.push(unit)
            if (product.unit === unit.id) {
              product.unitName = unit.name
              this.products.push(product)
            }
          })
        })
      } catch (err) {
        console.log(err.response)
      }

      // if (!this.$store.state.Units.units) {
      //   const response = (await CommonService.getUnits()).data
      //   response.forEach(element => {
      //     this.units.push(element)
      //   })
      //   this.$store.dispatch('setUnits', response)
      // }
      // this.units = this.$store.state.Units.units
      // console.log(this.$store.state.Units.units)

      // for (let i = 0; i < this.units.length; i++) {
      //   for (let j = 0; j < this.products.length; j++) {
      //     if (this.units[i].id === this.products[j].unit) {
      //       this.products[j].unitName = this.units[i].name
      //     }
      //   }
      // }
      // console.log(this.products)
    },
    // replaceUnit () {
    //   this.products.forEach(product => {
    //     if (product.unit === this.$store.state.Units.units)
    //   })
    // }

    editItem (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await ProductService.deleteProduct(this.editedIndex)
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
        const response = (await ProductService.createProduct(this.product)).data
        console.log(response)
        this.$emit('popSnackbar', {color: 'green', message: 'Yeni ürün eklendi!'})
        this.$nextTick(() => {
          window.location.reload()
        })
      } catch (err) {
        console.log(err.response.data)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 60px;
  font-family: 'Russo One';
}
</style>
