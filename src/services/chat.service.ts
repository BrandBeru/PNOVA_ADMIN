import boom from "@hapi/boom"
import { Chat } from "../db/models/chat.model"
import UserService from "./user.service"

const user = new UserService()

class ChatService{
  async create(...members: Array<string>){
    try{
      const users = await user.existUsers(...members)
      if(users.length !== members.length){
        throw new Error()
      }
      const response = await Chat.create({members})
      return response
    }catch(error){
      throw boom.badData()
    }
  }
  async getById(...ids:Array<string>){
    try{
      const users = await user.getUserById(...ids)
      return users
    }catch(error){
      throw boom.unauthorized()
    }
  }
  async sendMessage(chatId:string, userId:string, body:IMessage){
    const message = {
      ...body,
      transmitter: userId
    }
    const data = await Chat.updateOne({_id: chatId}, {$push: {
      messages: message
    }})
    return data
  }
  /**
   *
   * @param userId
   * @param chatId
   * @description Obtener los demas contactos del chat
   */
  async getMemberContact(chatId: string, userId: string){
    const chat = (await Chat.findOne({_id: chatId}))?.populate({
      path: 'members',
      select: 'name lastName username email meta'
    })
    const mem:any = (await chat)?.members
    const index = mem.indexOf(userId)
    const members = mem.splice(index, 1)
    return members
  }
  async findChatByMember(id: string){
    const chats = await Chat.find({members: id}).populate({
      path: 'members',
      select: 'name _id username email name lastName meta'
    })
    return chats
  }
  async findChatById(id: string){
    const chat = await Chat.findOne({_id: id}).populate({
      path: 'members',
      select: 'name _id username email name lastName meta'
    })
    return chat
  }
  async deleteChat(id: string){
    const data = await Chat.deleteOne({_id: id})
    return data
  }

}
export default ChatService
