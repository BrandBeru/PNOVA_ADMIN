import config from "../../../config/config";
import boom from '@hapi/boom'
import Twitter from 'passport-linkedin-oauth2'

const LinkedinStrategy = Twitter.Strategy

const options:any = {
  clientID: config.lClientID,
  clientSecret: config.lClientSecret,
  callbackURL: config.lCallbackUrl,
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true
}

const verifyHandler = async (accessToken:any, refreshToken:any, profile:any, done:any) => {
  console.log("ahh")
  process.nextTick(async () => {
    try{
      const password = await fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json())
      ''.toLowerCase
      console.log(profile)
      const data:any = {
        name: profile.displayName.split(" ")[0],
        lastName: profile.displayName.split(" ")[1],
        username: profile.username.toLowerCase(),
        email: profile.id,
        password: password,
        provider: profile.provider
      }
      return done(null, profile)
    }catch(error:any){
      throw boom.conflict(error)
    }
  })
}

const LinkedinOAuth = new LinkedinStrategy(options, verifyHandler)

export default LinkedinOAuth
