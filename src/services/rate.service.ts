import { Rate } from "../db/models/rate.model"

class RateService{
  async create(body: IRate){
    const rate = (await Rate.create(body)).populate({
      path: 'userId',
      select: 'username, name, lastName, email, meta'
    })
    return rate;
  }
  async find(skip:number, limit:number){
    const rates = await Rate.find({}).populate({
      path: 'userId',
      select: 'username, name, lastName, email, meta'
    }).skip(skip).limit(limit)
    return rates
  }
  async findByUserId(id: string){
    const rate = await Rate.findOne({userId: id})
    return rate
  }
  async findByRating(skip:number, limit:number){
    const rates = await Rate.find({})
    .populate({
      path: "serviceId",
      select: 'name description price'
    })
    .populate({
      path: "userId",
      select: 'username name lastName email'
    })
    .skip(skip)
    .limit(limit)
    .sort({rate: -1})
    return rates
  }
  async findByRate(rate: number, asc: boolean, skip:number, limit:number){
    const sort = asc ? 1 : -1
    const rates = await Rate.find({rate: rate})
    .sort({rate: sort})
    .skip(skip)
    .limit(limit)
    return rates
  }
  async findByServiceId(id: string){
    const rate = await Rate.find({serviceId: id})
    return rate
  }
}
export default RateService
