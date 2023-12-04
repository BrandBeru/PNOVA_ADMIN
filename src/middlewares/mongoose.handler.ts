import { NextFunction } from "express";
import { Schema } from "mongoose";
import boom from "@hapi/boom";

function MongooseHandler(schema:Schema, property:any){
    return (req:any, res:any, next:NextFunction) => {
      try{
        schema.pre(property, function (){
          throw boom.badData()
        })
        next()
      }catch(err){
        next(err)
      }
    }
}
export default MongooseHandler
