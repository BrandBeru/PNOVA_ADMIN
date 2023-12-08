import { Service } from "../db/models/service.model"
class ServiceService {
  async create(body: IService){
    const service = await Service.create(body);
    return service
  }
  async find(){
    const services = await Service.find()
    return services
  }
  async findById(id: string){
    const service = await Service.find({_id: id})
    return service
  }
  async remove(){

  }
}

export default ServiceService
