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
          <v-icon large class="mr-4">mdi-cat</v-icon>
          Hayvanlar
        </v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="animals"
      sort-by="first_name"
      class="elevation-1"
      :search="search"
    >
    <template v-slot:[`item.gender`]="{ item }">
      <v-chip
        :color="getGenderColor(item.gender)"
        v-text="getGenderName(item.gender)"
      >
      </v-chip>
    </template>

    <template v-slot:[`item.kind`]="{ item }">
      <span><v-icon color="orange" class="mr-2">mdi-cat</v-icon>{{item.kind.toUpperCase()}}</span>
    </template>

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
                      <v-text-field
                        v-model="editedItem.passport"
                        label="Pasaport"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        v-model="editedItem.birthday"
                        label="Doğum tarihi"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-text-field
                        v-model="editedItem.kind"
                        label="Cins"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="36"
                      sm="24"
                      md="12"
                    >
                      <v-select
                        v-model="editedItem.spayed"
                        :items="[{value: 'True', name: 'Evet'}, {value:'False', name: 'Hayır'}]"
                        item-text="name"
                        item-value="value"
                        label="Kısırlaştırma"
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
                        v-model="editedItem.specie"
                        :items="species"
                        item-text="name"
                        item-value="id"
                        label="Tür"
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
                        v-model="editedItem.color"
                        :items="colors"
                        item-text="name"
                        item-value="id"
                        label="Renk"
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
                        v-model="editedItem.gender"
                        :items="[{name: 'erkek', value: 'male'}, {name: 'dişi', value: 'female'}]"
                        item-text="name"
                        item-value="value"
                        label="Cinsiyet"
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
  </div>
</template>

<script>
import AnimalService from '@/services/AnimalService'
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
      { text: 'Pasaport', value: 'passport', class: 'text-h7 font-weight-bold' },
      { text: 'Tür', value: 'kind', class: 'text-h7 font-weight-bold' },
      { text: 'Cinsiyet', value: 'gender', class: 'text-h7 font-weight-bold' },
      { text: 'Renk', value: 'colorName', class: 'text-h7 font-weight-bold' },
      { text: 'Cins', value: 'specieName', class: 'text-h7 font-weight-bold' },
      { text: 'Actions', value: 'actions', sortable: false, class: 'text-h7 font-weight-bold' }
    ],
    animals: [],
    colors: [],
    species: [],
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
        const animalResponse = (await AnimalService.getAllAnimals()).data
        this.colors = (await CommonService.getColors()).data
        this.species = (await CommonService.getSpecies()).data
        animalResponse.forEach(animal => {
          this.colors.forEach(color => {
            // eslint-disable-next-line eqeqeq
            if (color.id == animal.color) {
              animal.colorName = color.name
              this.animals.push(animal)
            }
          })
          // eslint-disable-next-line eqeqeq
          animal.specieName = (this.species.find(o => o.id == animal.specie)).name
        })
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
        this.$emit('popSnackbar', {color: 'green', message: 'Hayvan silme başarılı!'})
        this.$nextTick(() => {
          window.location.reload()
        })
      } catch (err) {
        console.log(err.response)
        this.$emit('popSnackbar', {color: 'red', message: err.response.data})
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
        this.$emit('popSnackbar', {color: 'red', message: err.response.data})
      }
      this.close()
    },
    getGenderColor (gender) {
      if (gender === 'female') return '#fa89a4'
      if (gender === 'male') return '#91e0ff'
    },
    getGenderName (gender) {
      if (gender === 'female') return 'Dişi'
      if (gender === 'male') return 'Erkek'
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
