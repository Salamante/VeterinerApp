<template>
    <div>
        <v-toolbar
        dense
        flat
        color="#4a915d"
        dark
        class="mb-10"
      >
        <v-toolbar-title>
          <v-icon large class="mr-4">mdi-calendar</v-icon>
          Randevular
        </v-toolbar-title>
      </v-toolbar>

      <template>
        <v-container>
            <v-data-table
                :headers="headers"
                :items="appointments"
                sort-by="day"
                class="elevation-1"
            >
                <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    >
                    <v-card id="edit-card">
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
                                label="Dessert name"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.calories"
                                label="Calories"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.fat"
                                label="Fat (g)"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.carbs"
                                label="Carbs (g)"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                v-model="editedItem.protein"
                                label="Protein (g)"
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
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>

                    <v-dialog
                    v-model="dialogDelete"
                    max-width="500px">
                    <v-card id="delete-card">
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>

                    <v-dialog
                    v-model="dialogInspect"
                    max-width="500px">
                    <v-card id="inspect-card">
                        <v-card-title class="text-h5">{{editedItem.animalName}}</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeInspect">Kapa</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                <v-chip
                    label
                    dark
                    color="green"
                    class="mr-2"
                    @click="editItem(item)"
                ><v-icon class="mr-2">mdi-calendar-edit</v-icon>
                edit
                </v-chip>
                <v-chip
                    label
                    dark
                    class="mr-2"
                    outlined
                    color="red"
                    @click="deleteItem(item)"
                ><v-icon class="mr-2">mdi-cancel</v-icon>
                    iptal
                </v-chip>
                <v-chip
                    label
                    dark
                    outlined
                    color="blue"
                    @click="inspectItem(item)"
                ><v-icon class="mr-2">mdi-eye</v-icon>
                    Gözat
                </v-chip>
                </template>
            </v-data-table>
        </v-container>
      </template>

    </div>
</template>

<script>
import AppointmentService from '@/services/AppointmentService'
import AnimalService from '@/services/AnimalService'
export default {
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      dialogInspect: false,
      headers: [
        {
          text: 'Hasta',
          align: 'start',
          sortable: false,
          value: 'animalName',
          class: 'text-h5 black--text font-weight-bold'
        },
        { text: 'Randevu Tarihi', value: 'day', class: 'font-weight-bold text-h6' },
        { text: 'Ziyaret Amacı', value: 'description', class: 'font-weight-bold text-h6' },
        { text: 'Tipi', value: 'time', class: 'font-weight-bold text-h6' },
        { text: 'Ödeme', value: 'time', class: 'font-weight-bold text-h6' },
        { text: 'Actions', value: 'actions', sortable: false, class: 'font-weight-bold text-h6' }
      ],
      appointments: [],
      animalList: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        animalName: '',
        active: true,
        day: '',
        time: '',
        description: ''
      },
      defaultItem: {
        id: '',
        animalName: '',
        active: true,
        day: '',
        time: '',
        description: ''
      }
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

  async mounted () {
  },
  computed: {
    customer () {
      return this.editedItem
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Yeni Müşteri' : 'Müşteriyi Güncelle'
    }
  },
  methods: {
    async initialize () {
      try {
        const response = (await AppointmentService.getAllAppointments()).data
        const animals = (await AnimalService.getAllAnimals()).data

        animals.forEach(element => {
          this.animalList.push(element)
        })

        response.forEach(app => {
          this.appointments.push(app)
          this.animalList.forEach(animal => {
            if (app.animal === animal.id) {
              app.animalName = animal.name
            }
          })
        })
      } catch (err) {
        console.log(err.response)
      }
    },

    editItem (item) {
      this.editedIndex = this.appointments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.dialogDelete = true
    },
    inspectItem (item) {
      this.editedIndex = this.appointments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogInspect = true
    },

    async deleteItemConfirm () {
      try {
        const response = await AppointmentService.deleteAppointment(this.editedIndex)
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
    closeInspect () {
      this.dialogInspect = false
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

<style lang="sass" scoped>

</style>
