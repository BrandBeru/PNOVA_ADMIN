import passport from 'passport'
import LocalStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'
import GoogleOAuth from './strategies/google.strategy'

passport.use(LocalStrategy)
passport.use(JwtStrategy)
passport.use(GoogleOAuth)

passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user:any, done){
  done(null, user)
})
