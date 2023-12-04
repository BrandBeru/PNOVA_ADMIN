import AuthService from "../../../services/auth.service";
import {Strategy} from 'passport-local'

const service = new AuthService()
const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try{
    const user = await service.getUser(email, password)
    done(null, user)
  }catch(error){
    done(error, false)
  }
})
export default LocalStrategy
