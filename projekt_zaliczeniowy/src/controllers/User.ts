import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "../config/config";
import { refreshtokens } from '../server';

const createUser = async (req: Request, res: Response, next:NextFunction) =>{

    
    const {username, password, email} = req.body;

     
     const checkUsername = await User.findOne({username: username})
     if(checkUsername)
         return res.status(500).send('this username is taken')
 
     
     const checkEmail = await User.findOne({email: email})
     if(checkEmail)
         return res.status(400).send('this email address is already taken')
    
        //hash password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
    
    
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password : hashedPassword,
            email
    
        });
    
    
        try{
            const saveUser = await user.save();
            res.status(200).send(user + ' successfully registered')
        }catch(err){
            res.status(500).send(err)
        }

    // return user
    // .save()
    // .then((user) => res.status(200).json(
    //     {
    //         user
    //     }))
    // .catch((error) => res.status(500).json({error}))

};

const login = async (req: Request, res: Response, next:NextFunction) =>{

    const {username, password} = req.body;
    

    const findUsername = await User.findOne({username: username})

    if(!findUsername)
        return res.status(400).send('There is no user with this login');

        
    const checkPassword = await bcrypt.compare(password, findUsername.password )
       if(!checkPassword)
          return res.status(400).send('Invalid password')


        const accessToken = jwt.sign({username},config.server.token.secret, {expiresIn: "5m"});
        const refreshToken =jwt.sign({username},config.server.token.refresh);
        refreshtokens.push(refreshToken);
        console.log(refreshtokens);

          res.status(200).send(`Welcome ${username} Your token: ${accessToken}, Refresh token: ${refreshToken} `)
          
}

const refreshtoken =(req: Request, res: Response, next:NextFunction) =>{

    const {token} = req.body;
    

    if(!refreshtokens.includes(token))
    {
        res.status(403).json({message:`Access denied ,you must be logged in or your token is invalid`})
        
    }else
    {
      jwt.verify(token, config.server.token.refresh, (error:any,data:any)=>{
          if(error)
          {
              res.status(403).json({message:"access denied"})
          }else
          {
             const username = data.username;
        

          const newAccessToken = jwt.sign({username},config.server.token.secret, {expiresIn: "5m"});
            res.status(200).json({NewAccessToken: newAccessToken})
          }

      })  
    }
}

const logout = (req: Request, res: Response, next:NextFunction) =>{


    
    
        const {refreshtoken} = req.body;
        if(refreshtoken)
        {
            //filter array refreshtokens and send back the same array but without this one refreshtoken
        let x = refreshtokens.filter(t =>t!== refreshtoken);
            refreshtokens.fill(x)
         res.status(200).json({message:"logout"});
         console.log(refreshtokens);
        }else
        {
            res.status(500).json({message:"no token"});
        }


    
   
     
    
}


const getOneUser = (req: Request, res: Response, next:NextFunction) =>{

    
    
    const userId = req.params.userId;

    return User.findById(userId)
    .then( (user) => (user ? res.status(200).json({user}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));


};
const getAllUser = (req: Request, res: Response, next:NextFunction) =>{


    return User.find()
    .then((users) => res.status(200).json({users}))
    .catch((error) => res.status(500).json({error}));

};
const updateUser = (req: Request, res: Response, next:NextFunction) =>{

        const userId = req.params.userId;

        return User.findById(userId)
        .then((user) => {

            if(user)
            {
                user.set(req.body);

                return user
                .save()
                .then((user) => res.status(200).json({user}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: 'Not found'});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteUser = (req: Request, res: Response, next:NextFunction) =>{

        const userId = req.params.userId;

        return User.findByIdAndDelete(userId)
        .then((user) =>
         (user ? res.status(201).json({message:'User deleted from Db'}): res.status(404)
         .json({message:'User not found'})))
         .catch((error) => res.status(500).json({error}));

};

export default {createUser,login, refreshtoken,logout, getOneUser, getAllUser, updateUser, deleteUser};