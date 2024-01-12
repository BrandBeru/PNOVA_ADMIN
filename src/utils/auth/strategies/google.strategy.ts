import GoogleOAuth2 from 'passport-google-oauth20'
import config from '../../../config/config'
import boom from '@hapi/boom'

const GoogleStrategy = GoogleOAuth2.Strategy

const options:any = {
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackUrl,
}
const verifyHandler = async (accessToken:any, refreshToken:any, profile:any, cb:any, done:any) => {
  try{
    const password = await fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json())
    const data:any = {
      name: cb.name.givenName,
      lastName: cb.name.familyName,
      username: `user${cb.id}`,
      email: cb.emails[0].value,
      password: password,
      provider: cb.provider
    }
    return done(null, data)
  }catch(error:any){
    throw boom.conflict(error)
  }
}
const GoogleOAuth = new GoogleStrategy(options, verifyHandler)

export default GoogleOAuth
