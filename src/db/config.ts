import config from '../config/config'

const USER = encodeURIComponent(config.dbUser ?? '')
const PASSWORD = encodeURIComponent(config.dbPassword ?? '')
const URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}`
const development = {
  uri: URI,
  dialect: 'mongodb'
}
export {development}
