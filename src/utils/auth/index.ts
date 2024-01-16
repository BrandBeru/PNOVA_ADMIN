import passport from 'passport'
import LocalStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'
import GoogleOAuth from './strategies/google.strategy'
import MicrosoftOAuth from './strategies/microsoft.strategy'
import LinkedinOAuth from './strategies/linkedin.strategy'

passport.use(LocalStrategy)
passport.use(JwtStrategy)
passport.use(GoogleOAuth)
passport.use(MicrosoftOAuth)
passport.use(LinkedinOAuth)

passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user:any, done){
  done(null, user)
})
