import express from 'express'
import router from './src/routes.js'
import prisma from './src/database/index.js'

const app = express()
const port = process.env.PORT || 3000

await prisma.$connect()
    .then(() => {
        console.log('Connected to database')
    }).catch(error => {
        console.error('Failed to connect to database', error)
    })

app.use(router)

app.listen(port, () => console.log('Listening on', port))
