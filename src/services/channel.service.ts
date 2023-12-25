import { Group } from "../db/models/channel.model"

class ChannelService {
  async create(body: IChannel){
    const channel = Group.create(body)
    return channel
  }
  async find(){
    const channels = Group.find({})
    return channels
  }
  async findOne(id:string){
    const channel = Group.findOne({_id:id})
    return channel
  }
  async updateOne(id: string, body: IChannel){

  }
  async deleteOne(id: string){

  }
}
export default ChannelService
