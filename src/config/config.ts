require('dotenv').config()
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

const secretId = 'projects/573935121603/secrets/PnovaSecrets/versions/latest'

export async function grantAccess(parent:any){
  const client = new SecretManagerServiceClient()
  const request = {
    parent,
  }
  const iterable = await client.listSecretsAsync(request)
  for await(const response of iterable){
  }
}
const config = {
  env: process.env.NODE_ENV||'',
  port: process.env.PORT||'',
  host: process.env.NODE_HOST||'',
  dbUser: process.env.DB_USER||'',
  dbPassword: process.env.DB_PASSWORD||'',
  dbName: process.env.DB_NAME||'',
  dbHost: process.env.DB_HOST||'',
  dbPort: process.env.DB_PORT||'',
  jwtSecret: process.env.JWT_SECRET||'',
  apiKey: process.env.API_KEY||'',
  clientId: process.env.CLIENT_ID||'',
  clientSecret: process.env.CLIENT_SECRET||'',
  callbackUrl: process.env.CALLBACK_URL||'',
  mClientId: process.env.M_CLIENT_ID||'',
  mClientSecret: process.env.M_CLIENT_SECRET||'',
  mCallbackUrl: process.env.L_CALLBACK_URL||'',
  lClientSecret: process.env.L_CLIENT_SECRET||'',
  lCallbackUrl: process.env.L_CALLBACK_URL||'',
  lClientID: process.env.L_CLIENT_ID||'',
  project: process.env.PROJECT||'',
  version: process.env.VERSION||'',
  encode_password: process.env.ENCODE_PASSWORD||'',
  encode_initial: process.env.ENCODE_INITIAL||'',
  encode_algorithm: process.env.ENCODE_ALGORITHM||'',
  frontend_url: process.env.FRONTEND_URL||'',
  email_host: process.env.EMAIL_HOST||'',
  email_user: process.env.EMAIL_USER||'',
  email_password: process.env.EMAIL_PASSWORD||''
}

export default config
