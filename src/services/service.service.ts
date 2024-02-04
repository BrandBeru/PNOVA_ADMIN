import { Service } from "../db/models/service.model"
class ServiceService {
  async create(body: IService){
    const services = await Service.create(body);
    return services
  }
  async find(){
    const services = await Service.find({})
    return services
  }
  async findById(id: string){
    const service = await Service.find({_id: id})
    return service
  }
  async updateById(id: string){
    const rta = await Service.updateOne({_id: id})
    return rta
  }
  async remove(){

  }
}

export default ServiceService
