import { Router } from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';
import NewService from '../services/new.service';
import validatorHandler from '../middlewares/validator.handler';
import { createNewSchema, findOneNewSchema } from '../schemas/new.schema';

const router = Router()
const service = new NewService()

router.post('/', validatorHandler(createNewSchema, 'body'), passport.authenticate('jwt'), checkRoles('admin'), async (req, res, next) => {
  try{
    const body = req.body
    const rta = await service.create(body)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.post('/like/:id', validatorHandler(findOneNewSchema, 'params'), passport.authenticate('jwt'), checkRoles('client', 'user'), async (req:any, res, next) => {
  try{
    const userId = req.user.sub
    const {id} = req.params
    const rta = await service.like(id, userId)
    res.json(rta)
  }catch(err){
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try{
    const rta = await service.findAll()
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get('/:id', validatorHandler(findOneNewSchema, 'params'), async (req, res, next) => {
  try{
    const {id} = req.params
    const rta = await service.findOne(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.patch('/:id', validatorHandler(findOneNewSchema, 'params'), passport.authenticate('jwt'), checkRoles('admin'), async (req, res, next) => {
  try{
    const {id} = req.params
    const rta = await service.findOne(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})

export default router
