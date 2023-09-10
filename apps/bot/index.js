import LilicasClient from './src/LilicasClient.js'

const client = new LilicasClient(process.env.TOKEN, {
  intents: ['guilds', 'guildMessages', 'guildMembers']
})

client.login()
