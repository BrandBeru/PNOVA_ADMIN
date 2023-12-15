import express, {Express} from 'express'

import usersRouter from './users'
import authRouter from './auth'
import chatRouter from './chat'
import groupRouter from './group'
import serviceRouter from './service'
import rateRouter from './rate'
import { Server } from 'http'

export default function routerApi(app: Express, server: Server){
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/users', usersRouter)
  router.use('/chats', chatRouter(server))
  router.use('/groups', groupRouter)
  router.use('/services', serviceRouter)
  router.use('/rates', rateRouter)
}
