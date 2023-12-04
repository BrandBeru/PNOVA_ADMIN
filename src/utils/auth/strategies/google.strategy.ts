import GoogleOAuth2 from 'passport-google-oauth20'

const GoogleStrategy = GoogleOAuth2.Strategy

const options = {
  clientID: '988821143071-h765n0ffhvndm52p7ofgkkp0e44puu4e.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/api/v1/auth/google/callback',
}
const verifyHandler = (accessToken:any, refreshToken:any, profile:any, cb:any, done:any) => {
  const data = {
    id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified
  }
  return done(null, data)
}

const GoogleOAuth = new GoogleStrategy(options, verifyHandler)

export default GoogleOAuth
