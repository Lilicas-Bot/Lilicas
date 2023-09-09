import LilicasClient from './src/LilicasClient.js'

await import('dotenv').then(dotenv => dotenv.config({ path: '../../.env' }))
const client = new LilicasClient(process.env.TOKEN, {
  intents: ['guilds', 'guildMessages', 'guildMembers']
})

client.login()
