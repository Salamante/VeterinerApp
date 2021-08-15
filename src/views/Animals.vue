<template>
 <div class="body">
  <v-container>
    <v-data-table
      :headers="headers"
      :items="animals"
      sort-by="first_name"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>KAYITLI HAYVANLAR</v-toolbar-title>
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
                Hayvan Ekle
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
                        v-model="editedItem.name"
                        label="İsim"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.passport"
                        label="Pasaport"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.birthday"
                        label="Doğum tarihi"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.kind"
                        label="Cins"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.spayed"
                        label="Kısırlaştırma"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.specie"
                        label="Tür"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.color"
                        label="Renk"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.gender"
                        label="Cinsiyet"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.owner"
                        label="Sahibi"
                        type="number"
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
  </v-container>
 </div>
</template>

<script>
import AnimalService from '@/services/AnimalService'

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
        class: 'black--text text-h5'
      },
      { text: 'Pasaport', value: 'passport', class: 'black--text text-h5' },
      { text: 'Tür', value: 'kind', class: 'black--text text-h5' },
      { text: 'Cinsiyet', value: 'specie', class: 'black--text text-h5' },
      { text: 'Renk', value: 'color', class: 'black--text text-h5' },
      { text: 'Sahibi', value: 'owner', class: 'black--text text-h5' },
      { text: 'Actions', value: 'actions', sortable: false, class: 'black--text text-h5' }
    ],
    animals: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      passport: '',
      kind: '',
      spayed: '',
      specie: '',
      color: '',
      gender: '',
      owner: Number(this.owner)

    },
    defaultItem: {
      id: '',
      name: '',
      passport: '',
      kind: '',
      spayed: '',
      specie: '',
      color: '',
      gender: '',
      owner: Number(this.owner)
    }
  }),
  async mounted () {
  },
  computed: {
    animal () {
      return this.editedItem
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Yeni Hayvan' : 'Hayvanı Güncelle'
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
        const response = (await AnimalService.getAllAnimals()).data
        response.forEach(animal => {
          this.animals.push(animal)
        })
        console.log(this.animals)
      } catch (err) {
        console.log(err.response)
      }
    },

    editItem (item) {
      this.editedIndex = this.animals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await AnimalService.deleteAnimal(this.editedIndex)
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
        const response = (await AnimalService.createAnimal(this.animal)).data
        console.log(response)
        this.$emit('popSnackbar', {color: 'green', message: 'Yeni hayvan eklendi!'})
      } catch (err) {
        console.log(err.response.data)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.body {
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  min-height: 1080px;
  background: #C6FFDD;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
