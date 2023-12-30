import { Order } from "../db/models/order.model"
import UserService from "./user.service"

const user = new UserService()
class OrderService{
  async create(body: IOrder){
    const order = await Order.create(body)
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
    const orders = await Order.findOne({_id: id})
    return orders
  }
  async updateById(id: string){
    const rta = await Order.updateOne({_id: id})
    return rta
  }

}
export default OrderService
