const knex = require('./knex')

function getAllCustomers () {
  return knex('customers_table').select('*')
}
module.exports = { getAllCustomers }

// const sqlite3 = require('sqlite3').verbose()

// open the database
// let db = new sqlite3.Database('./db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message)
//   }
//   console.log('Connected to the customers database.')
// })

// function getAllCustomers () {
//   let sql = `SELECT id, pet_name, pet_type
//             FROM customers_table
//             ORDER BY id`

//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err
//     }
//     const list = {}
//     rows.forEach((row) => {
//       Object.assign(list, row)
//       console.log(row)
//       return list
//     })
//   })
// }

// module.exports = { getAllCustomers }
