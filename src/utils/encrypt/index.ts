import boom from "@hapi/boom"
import config from "../../config/config"
import crypto,{createCipheriv, createDecipheriv} from 'crypto'

const algorithm = config.encode_algorithm
const key = crypto.scryptSync(config.encode_password, 'salt',32)

export function encryption(text:string){
  return new Promise((resolve, reject) => {
    const iv = crypto.randomBytes(16)
    const cipher = createCipheriv(algorithm, key, iv)
    let ciph = cipher.update(text, 'utf-8','base64')
    ciph += cipher.final('base64')
    resolve({ciph, iv: iv.toString('hex')});
  })
}
export function decryption(encrypt:any, ivData:any){
  return new Promise((resolve, reject) => {
    const iv = Buffer.from(ivData, 'hex')
    const decipher = createDecipheriv(algorithm, key, iv)
    let text = decipher.update(encrypt, 'base64', 'utf-8')
    text += decipher.final('utf8')

    resolve(text)
  })
}
