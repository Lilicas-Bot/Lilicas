import redis from 'redis'

const redisClient = redis.createClient(process.env.REDIS_URL)
export default redisClient
