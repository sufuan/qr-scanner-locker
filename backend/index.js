const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const QRCode = require('qrcode')
const {readdirSync} = require('fs')
const ConnectDB = require('./config/db')
require("dotenv").config(); 


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())




readdirSync('./routes').map(r => app.use('/', require('./routes/' + r)))

ConnectDB()


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
