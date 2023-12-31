import express from 'express'
import router from './src/routes.js'
import redisClient from './src/redis/index.js'

const app = express()
const port = process.env.PORT || 3000

if (!process.env.DATABASE_URI && !process.env.TOKEN && !process.env.REDIS_URL) {
  console.error('Environment variables not set')
  process.exit(1)
}

redisClient.on('error', error => {
  console.error('Failed to connect to redis', error)
})

app.use((req, res, next) => {
  req.redis = redisClient
  next()
})

app.use(router)

app.listen(port, () => console.log('Listening on', port))
