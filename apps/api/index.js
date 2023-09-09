import express from 'express'
import router from './src/routes.js'
import prisma from './src/database/index.js'

const app = express()
const port = process.env.PORT || 8080

await prisma.$connect().then(() => console.log("É MLK?")).catch(error => console.error("n foi mlk", error))

app.use(router)
app.listen(port, () => console.log('Listening on', port))
