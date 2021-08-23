import store from '../store/store'
import AppointmentService from './AppointmentService'
import AnimalService from './AnimalService'
import CustomerService from './CustomerService'
// import CommonService from './CommonService'
// import ProductService from './ProductService'

function modifyTimeText (time) {
  const regex = /\d+.\d+/
  return time.match(regex)[0]
}

function modifyDayText (day) {
  const arr = day.split('-').splice(1, 2)
  const dayNum = arr[1]
  let dayText = ''
  switch (arr[0]) {
    case '01':
      dayText = 'Ocak'
      break
    case '02':
      dayText = 'Şubat'
      break
    case '03':
      dayText = 'Mart'
      break
    case '04':
      dayText = 'Nisan'
      break
    case '05':
      dayText = 'Mayıs'
      break
    case '06':
      dayText = 'Haziran'
      break
    case '07':
      dayText = 'Temmuz'
      break
    case '08':
      dayText = 'Ağustos'
      break
    case '09':
      dayText = 'Eylül'
      break
    case '10':
      dayText = 'Ekim'
      break
    case '11':
      dayText = 'Kasım'
      break
    case '12':
      dayText = 'Aralık'
      break
    default:
      dayText = 'Object Object'
      break
  }
  return `${dayNum} ${dayText}`
}

function getAnimalName (id) {
  const animals = store.state.Animals.animals
  // eslint-disable-next-line eqeqeq
  return (animals.find(o => o.id == id)).name
}

export default {
  async initialize () {
    try {
      var appointments = (await AppointmentService.getAllAppointments()).data
      store.state.Appointments.appointments = appointments

      var animals = (await AnimalService.getAllAnimals()).data
      store.state.Animals.animals = animals

      var customers = (await CustomerService.getAllCustomers()).data
      store.state.Customers.customers = customers
    } catch (err) {
      console.log(err.response)
    }
  },

  async appointmentClose () {
    var appointmentsAll = (await AppointmentService.getAllAppointments()).data
    store.state.Appointments.appointments = appointmentsAll
    let today = new Date()
    var appointmentsClose = []
    appointmentsAll.forEach(appointment => {
      appointment.time = modifyTimeText(appointment.time)
      const formattedDay = new Date(appointment.day)
      let remainingDays = Math.floor((formattedDay - today) / (1000 * 60 * 60 * 24))
      if (remainingDays > 0 && remainingDays < 5) {
        appointment.dayText = modifyDayText(appointment.day)
        appointment.animalName = getAnimalName(appointment.animal)
        appointmentsClose.push(appointment)
        store.dispatch('setAppointment', appointment)
      }
    })
  }
}
