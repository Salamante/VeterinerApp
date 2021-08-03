const express = require('express')
const path = require('path')
const customersDb = require('./src/databases/customers_database/customers')
const appointmentDb = require('./src/databases/appointment_database/appointments')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
// app.use(express.static(path.join(__dirname, './dist')))

// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, './build/index.html'))
// })

// app.post("/customers_table", async (req, res) => {
//     const results = await db.createCustomer(req.body)
//     res.status(201).json({id: results[0]})
// })

app.get("/customers_table", async (req, res) => {
    const customers = await db.getAllCustomers()
    res.status(200).json(customers)
})

app.get("/customers_table", async (req, res) => {
    const customers = await db.getAllCustomers()
    res.status(200).json(customers)
})

// app.patch("/customers_table/:id", async (req, res) => {
//     const id = await db.updateCustomer(req.params.id, req.body)
//     res.status(200).json({ id })
// })

// app.delete("/customers_table/:id", async (req, res) => {
//     await db.deleteCustomer(req.params.id)
//     res.status(200).json({ success: true })
// })


app.get('/', (req,res) => {
    res.send('TESTING STUFF')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`))