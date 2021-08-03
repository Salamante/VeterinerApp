const knex = require('./knex')

function getAllCustomers () {
  return knex('customers_table').select('*')
}
module.exports = { getAllCustomers }
