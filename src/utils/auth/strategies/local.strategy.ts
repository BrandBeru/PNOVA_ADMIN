import AuthService from "../../../services/auth.service";
import {Strategy} from 'passport-local'
import UserService from "../../../services/user.service";
import boom from '@hapi/boom'

const service = new AuthService()
const userService = new UserService()
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try{
    const rta = await userService.findByEmailForVerification(email);
    if(rta){
      throw boom.forbidden('Email is unverified')
    }
    const user = await service.getUser(email, password)
    done(null, user)
  }catch(error){
    done(error, false)
  }
})
export default LocalStrategy
