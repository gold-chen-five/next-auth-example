import {sign} from 'jsonwebtoken'
import { serialize } from "cookie";

const secret = '123456'
//const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export default async function handler(req, res) {
    const { method } = req
    const { body } = req
    switch(method){
        case 'POST':{
            try{
                
                const user = {
                    account:body.account
                }
                
                //const accessToken = sign(user,accessTokenSecret,{expiresIn:'1h'})
                const token = sign(user, secret)
                const serialised = serialize('refreshToken', token, {
                    maxAge: 60 * 60 * 24 * 30,
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    secure: process.env.NODE_ENV !== "development",//set cookie https or http
                })

                res.setHeader('Set-Cookie', serialised)
                res.status(200).json({
                    account: user.account,
                    accessToken: '123456'
                })
            }catch(err){
                res.status(400).json({message: err.message})
            }
           
            break            
        }
        default:{
            res.status(405).json({ nmessage: 'fail'})
            break
        }
    }
    
}
  