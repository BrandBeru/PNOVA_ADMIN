import express, {Express} from 'express'

import { Server } from 'http'
import usersRouter from './users'
import authRouter from './auth'
import chatRouter from './chat'
import serviceRouter from './service'
import rateRouter from './rate'
import channelRouter from './channel'
import orderRouter from './order'
import newsRouter from './new'
import config from '../config/config'

export default function routerApi(app: Express, server: Server, session: any){
  const router = express.Router()
  app.use(`/${config.project}/${config.version}`, router)
  router.use('/auth', authRouter)
  router.use('/users', usersRouter)
  router.use('/chats', chatRouter(server, session))
  router.use('/services', serviceRouter)
  router.use('/rates', rateRouter)
  router.use('/channels', channelRouter)
  router.use('/orders', orderRouter)
  router.use('/news', newsRouter)
}
