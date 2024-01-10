import { User } from "../db/models/user.model";
import bcrypt from 'bcryptjs'
import boom from '@hapi/boom'

class UserService{
  async findByName(name:string){
    const users = await User.find({
      $and: [{name: {$regex: name, $options: "i"}}, {meta: {isActive: true}}]
    }).select({name:1, lastName:1, email:1})
    if(!users.length){
      throw boom.notFound()
    }
    return users
  }
  async findByUsername(username: string){
    const user = await User.findOne({$and: [{username: username}, {meta: {isActive: true}}]}).select({
      name:1, lastName:1, email:1, username:1, _id:0
    })
    if(!user){
      throw boom.notFound()
    }
    return user
  }
  async getUsernameById(id: string){
    const user = await User.findOne({_id:id},{username:1, _id:0})
    return user.username
  }
  async findByEmail(email: string){
    const user = await User.findOne({$and: [{email: email}, {meta: {isActive: true}}]})
    return user
  }
  async findOne(id: string){
    const user = await User.findOne({$and: [{_id: id}, {"meta.isActive": true}]})
    return user
  }
  async getUserById(...ids:Array<string>){
    const users = await User.find({_id: {$in: [...ids]}}).select({
      name:1, lastName:1, email:1, username: 1, meta: 1
    })
    return users
  }
  async getById(id: string){
    const user = await User.findOne({_id:id},{username:1, name:1, lastName:1, email:1, role:1})
    return user
  }
  async getClients(){
    const clients = await User.find({$and: [{role: 'client'}, {"meta.isActive": true}]})
    return clients
  }
  async create(user: IUser){
    const hash = await bcrypt.hash(user.password.toString(), 10)
    const rta = await User.create({
      ...user,
      password: hash
    })
    return rta
  }
  async updateOne(id:string, data:Object){
    const user = await this.findOne(id)
    const updated = {
      ...data,
      meta: {
        ...user.meta,
        modifiedDate: new Date()
      }
    }
    const rta = await User.updateOne({$and: [{_id: id}, {"meta.isActive": true}]}, updated)
    return rta
  }
  async existUsers(...users:Array<String>){
    return await User.find({_id: {$in: users}})
  }
  async existUsersByEmail(...users:Array<String>){
    return await User.find({email: {$in: users}})
  }
  async updateRole(userId: string, role: string){
    await User.updateOne({_id: userId}, {$set:{role:role}})
  }
}

export default UserService
