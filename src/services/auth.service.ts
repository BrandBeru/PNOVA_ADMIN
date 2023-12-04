import boom from "@hapi/boom"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserService from "./user.service"
import config from "../config/config"

const service = new UserService()
class AuthService{
  async getUser(email:string, password:string){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.notFound()
    }
    const compare = await bcrypt.compare(password, user.password)
    if(!compare){
      throw boom.unauthorized()
    }
    return user
  }
  async signToken(user:any){
    const payload = {
      sub: user._id,
      scope: "client"
    }
    const secret:string = config.jwtSecret || ''
    const token = jwt.sign(payload, secret)
    return token
  }
}

export default AuthService
