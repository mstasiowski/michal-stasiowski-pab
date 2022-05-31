import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';





export function authenticateToken(req:Request,res:Response,next:NextFunction){


    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null)
    return res.status(401).json({message:"you don't have access, log in"})


    jwt.verify(token, config.server.token.secret, (error, data:any) =>{
        if(error) 
        {
            return res.status(403).json({message:"wrong token"})
        }else
        res.locals.jwt = data;
        console.log(data.username)
        next()
    })
}


export function checkAdmin(req:Request,res:Response,next:NextFunction){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

if(!token)
{
return res.status(401).json({message:"You need to log in to use it"})
}else
{
    jwt.verify(token, config.server.token.secret, (error, data:any) =>{
        if(error) 
        {
            return res.status(403).json({message:"wrong token"})
        }else
        {
        res.locals.jwt = data;
       const checkuser = data.username;

        
        if(checkuser == "admin")
        {
            next()
        }else
        {
            res.status(401).json({message:`You don't have admin permission `})
        }
    }
})

}
}





export default authenticateToken;
