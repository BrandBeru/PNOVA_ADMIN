import express, {Express} from 'express'

import { Server } from 'http'
import usersRouter from './users'
import authRouter from './auth'
import chatRouter from './chat'
import groupRouter from './group'
import serviceRouter from './service'
import rateRouter from './rate'
import channelRouter from './channel'
import config from '../config/config'

export default function routerApi(app: Express, server: Server, session: any){
  const router = express.Router()
  app.use(`/${config.project}/${config.version}`, router)
  router.use('/auth', authRouter)
  router.use('/users', usersRouter)
  router.use('/chats', chatRouter(server, session))
  router.use('/groups', groupRouter)
  router.use('/services', serviceRouter)
  router.use('/rates', rateRouter)
  router.use('/channels', channelRouter)
}
