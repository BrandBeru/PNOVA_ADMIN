import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import boom from "@hapi/boom";

function checkApiKey(req:Request, res:Response, next:NextFunction){
  const apiKey = req.headers['api']
  if(apiKey === config.apiKey){
    next()
    return
  }
  next(boom.unauthorized())
}

function checkRoles(...roles:Array<string>){
  return (req:any,res:any, next:NextFunction) => {
    const user = req.user
    if(roles.includes(user.sub)){
      next()
    }else{
      throw boom.unauthorized()
    }
  }
}
export {checkApiKey, checkRoles}
