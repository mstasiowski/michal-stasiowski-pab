import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import WatchedMovies from '../models/WatchedMovies'

const createWatchedMovies = async (req: Request, res: Response, next:NextFunction) =>{

    const {username, watched} = req.body;
    
    

    const watchedmovies = new WatchedMovies({
        _id: new mongoose.Types.ObjectId(),
        username ,
        watched: watched.push(watched),

    });

};


const getAllWatchedMovies = (req: Request, res: Response, next:NextFunction) =>{

    const username = req.params.username;
    console.log(username)

    return WatchedMovies.findById(username)
    .then( (user) => (user ? res.status(200).json({user}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));

};


export default {createWatchedMovies, getAllWatchedMovies};