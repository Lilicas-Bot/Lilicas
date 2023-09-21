import { EmbedColors } from '../util/Constants.js'

export default class Embed {
  constructor () {
    this.type = 'rich'
    this.color = EmbedColors.DEFAULT
    this.fields = []
  }

  setTitle (title) {
    this.title = title
    return this
  }

  setDescription (description) {
    this.description = description
    return this
  }

  setColor (color) {
    this.color = parseInt(color, 16)
    return this
  }

  setAuthor (name, iconUrl, url) {
    this.author = {
      name,
      url,
      icon_url: iconUrl
    }
    return this
  }

  setFooter (text, iconUrl) {
    this.footer = {
      text,
      icon_url: iconUrl
    }
    return this
  }

  setThumbnail (url, width, height) {
    this.thumbnail = {
      url,
      width,
      height
    }
    return this
  }

  setUrl (url) {
    this.url = url
    return this
  }

  setTimestamp (timestamp) {
    this.timestamp = new Date(timestamp).toISOString()
    return this
  }

  setImage (url, width, height) {
    this.image = {
      url,
      width,
      height
    }
    return this
  }

  addFields (fields) {
    this.fields.push(...fields)
    return this
  }
}
