import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import axios from 'axios'
import {sign} from 'jsonwebtoken'
import { serialize } from "cookie";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

export default (req,res) => {
    return NextAuth(req,res,{
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProviders({
        async authorize(credentials) {
            const {account} = credentials
            const {password} = credentials
            if(account === 'admin' && password === '123456'){
                const user = {
                    account: account
                }
                
                try{
                    const accessToken = sign(user,accessTokenSecret,{expiresIn:'1h'})
                    
                    const userToken = {
                        accessToken: accessToken
                    }
                   
                    return userToken
                }
                catch(err){
                    console.log('error')
                    return null
                }
            }else{
                return null
            } 
        },
        }),
    ],
    // callback
    callbacks: {
        async session({session,token}) {
        
        session.accessToken = token.accessToken;
        
        return session;
        },

        async jwt({token,user}) {
        if (user) {
            token.accessToken = user.accessToken;
        }
        //console.log(token)
        return token;
        },
    },
    });
}