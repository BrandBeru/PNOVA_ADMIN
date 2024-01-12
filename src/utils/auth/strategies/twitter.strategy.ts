import config from "../../../config/config";
import boom from '@hapi/boom'
import Twitter from 'passport-twitter'

const TwitterStrategy = Twitter.Strategy

const options:any = {
  consumerKey: config.tConsumerKey,
  consumerSecret: config.tConsumerSecret,
  callbackURL: config.tCallbackUrl
}

const verifyHandler = async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
  try{
    const password = await fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json())
    ''.toLowerCase
    const data:any = {
      name: profile.displayName.split(" ")[0],
      lastName: profile.displayName.split(" ")[1],
      username: profile.username.toLowerCase(),
      email: profile.id,
      password: password,
      provider: profile.provider
    }
    return cb(null, data)
  }catch(error:any){
    throw boom.conflict(error)
  }
}

const TwitterOAuth = new TwitterStrategy(options, verifyHandler)

export default TwitterOAuth
