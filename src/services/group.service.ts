import { Group } from "../db/models/channel.model"

class GroupService{
  async create(body:IGroup, adminId: string){
    const data = {
      ...body,
      admins: [adminId]
    }
    const group = await Group.create(data)
    return group
  }
  async findByMember(){

  }
}

export default GroupService
