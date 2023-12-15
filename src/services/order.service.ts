import { Order } from "../db/models/order.model"

class OrderService{
  create(body: IOrder){
    const order = Order.create(body)
    return order
  }
  find(skip: number, limit: number){
    const orders = Order.find({})
    .skip(skip)
    .limit(limit)
    return orders
  }
  findOne(id: string){
    const orders = Order.findOne({_id: id})
    return orders
  }
  updateById(id: string){
    const rta = Order.updateOne({_id: id})
    return rta
  }

}
export default OrderService
