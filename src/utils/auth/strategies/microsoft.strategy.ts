import boom from "@hapi/boom"
import Microsoft from 'passport-microsoft'
import config from "../../../config/config"

const MicrosoftStrategy = Microsoft.Strategy

const options = {
  clientID: config.mClientId,
  clientSecret: config.mClientSecret,
  callbackURL: config.mCallbackUrl,
  scope: ['user.read'],
  tenant: 'common',
}

const verifyHandler = async (accessToken:any, refreshToken:any, profile:any, done:any) => {
  try{
    const password = await fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json())
    const data:any = {
      name: profile.name.givenName,
      lastName: profile.name.familyName,
      username: `user${profile.id}`,
      email: profile.emails[0].value,
      password: password,
      provider: profile.provider
    }
    return done(null, data)
  }catch(error:any){
    throw boom.conflict(error)
  }
}

const MicrosoftOAuth =  new MicrosoftStrategy(options, verifyHandler)

export default MicrosoftOAuth
