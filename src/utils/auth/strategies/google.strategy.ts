import GoogleOAuth2 from 'passport-google-oauth20'
import config from '../../../config/config'
import UserService from '../../../services/user.service'
import boom from '@hapi/boom'
import mongoose from 'mongoose'
import AuthService from '../../../services/auth.service'

const GoogleStrategy = GoogleOAuth2.Strategy
const service = new UserService()
const auth = new AuthService()

const options:any = {
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackUrl,
}
const verifyHandler = async (accessToken:any, refreshToken:any, profile:any, cb:any, done:any) => {
  try{
    const user = await service.existUsersByEmail(cb.emails[0].value)
    if(user){
      const token = login(user)
      return done(null, token)
    }
    const password = await fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json())
    const data:any = {
      name: cb.name.givenName,
      lastName: cb.name.familyName,
      username: `user${cb.id}`,
      email: cb.emails[0].value,
      password: password,
    }
    const rta = await service.create(data)
    const token = login(rta)
    return done(null, token)
  }catch(error:any){
    throw boom.conflict(error)
  }
}
async function login(user:any){
  const token = await fetch(`http://localhost:${config.port}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  })
  return token
}

const GoogleOAuth = new GoogleStrategy(options, verifyHandler)

export default GoogleOAuth
