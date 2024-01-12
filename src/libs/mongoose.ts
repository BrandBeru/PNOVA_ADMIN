import { Error, Mongoose } from 'mongoose';
import {development} from '../db/config'
import config from '../config/config';
const mongoose:Mongoose = require('mongoose');

// const USER = encodeURIComponent(config.dbUser ?? '')
// const PASSWORD = encodeURIComponent(config.dbPassword ?? '')
// const URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authMechanism=DEFAULT`
var db = null;

export default async function mongoConnection(){
  await mongoose.connect(development.uri)
}

export {db}
