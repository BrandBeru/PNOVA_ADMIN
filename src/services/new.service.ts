import mongoose from "mongoose";
import INews from "../db/interfaces/INews";
import { New } from "../db/models/new.model";

class NewService {
  async create(body: INews){
    const rta = await New.create(body)
    return rta
  }
  async like(newId:string, id: string){
    const liked = await New.findOne({_id: newId, likes: {$in: [id]}})
    if(liked) return {message: 'Already liked',liked: true}
    const rta = await New.updateOne({_id: newId}, {$push: {likes: id}})
    return rta
  }
  async findAll(){
    const news = await New.find({})
    return news
  }
  async findOne(id: string){
    const rta = await New.findOne({_id: id}).populate({path: 'likes', select: 'name lastName username meta'})
    return rta
  }
  async updateOne(id: string, params: {}){
    const rta = await New.updateOne({_id: id}, params)
    return rta
  }
}

export default NewService
