import { Order } from "../db/models/order.model"
import UserService from "./user.service"

const user = new UserService()
class OrderService{
  async create(body: IOrder){
    var order = (await Order.create(body)).populate({
      path: 'clientId',
      select: '_id name lastName username email meta'
    })
    order = (await order).populate('serviceId')
    await user.updateRole(body.clientId.toString(), 'client')
    return order
  }
  async find(skip: number, limit: number, clientId: string){
    const orders = await Order.find({clientId: clientId})
    .skip(skip)
    .limit(limit)
    return orders
  }
  async findOne(id: string){
    const orders = await Order.findOne({_id: id}).populate('serviceId').populate({
      path: 'clientId',
      select: '_id name lastName username email meta'
    })
    return orders
  }
  async updateById(id: string, body: object){
    var rta = await Order.updateOne({_id: id}, body).populate({
      path: 'clientId',
      select: '_id name lastName username email meta'
    }).populate('serviceId')
    return rta
  }

}
export default OrderService
