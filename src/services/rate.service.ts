import { Rate } from "../db/models/rate.model"

class RateService{
  async create(body: IRate){
    const rate = await Rate.create(body)
    return rate;
  }
  async find(){
    const rates = await Rate.find({}).populate({
      path: 'userId',
      select: 'username, name, lastName, email, meta'
    })
    return rates
  }
  async findByUserId(id: string){
    const rate = await Rate.find({userId: id})
    return rate
  }
  async findByServiceId(id: string){
    const rate = await Rate.find({serviceId: id})
    return rate
  }
}
export default RateService
