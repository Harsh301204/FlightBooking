const express = require('express')
const bodyparser = require('body-parser')
const app = express()
// const sequelize1 = require('sequelize')

// const  { DB_SYNC } = require('./config/ServerConfig.js')

// const db = require('./models/index.js')


const apiRoutes = require('./routes/index.js')

const { PORT } = require('./config/ServerConfig.js')

const SetupAndStartServer = () => {

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes)


    app.listen(PORT, async () => {
        console.log(`Server Started on PORT ${PORT}`)
        // if (DB_SYNC) {
        //     db.sequelize.sync({ alter: true })
        // }
    })
}

SetupAndStartServer()