import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Genre from '../models/Genre'

const createGenre = (req: Request, res: Response, next:NextFunction) =>{

    const {name} = req.body;
   

    const genre = new Genre({
        _id: new mongoose.Types.ObjectId(),
        name,
    });

    return genre
    .save()
    .then((genre) => res.status(200).json({genre}))
    .catch((error) => res.status(500).json({error}))

};

const getOneGenre = (req: Request, res: Response, next:NextFunction) =>{

    const genreId = req.params.genreId;

    return Genre.findById(genreId)
    .then( (genre) => (genre ? res.status(200).json({genre}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));


};
const getAllGenre = (req: Request, res: Response, next:NextFunction) =>{

    return Genre.find()
    .then((genres) => res.status(200).json({genres}))
    .catch((error) => res.status(500).json({error}));

};
const updateGenre = (req: Request, res: Response, next:NextFunction) =>{

        const genreId = req.params.genreId;

        return Genre.findById(genreId)
        .then((genre) => {

            if(genre)
            {
                genre.set(req.body);

                return genre
                .save()
                .then((genre) => res.status(200).json({genre}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: 'Not found'});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteGenre = (req: Request, res: Response, next:NextFunction) =>{

        const genreId = req.params.genreId;

        return Genre.findByIdAndDelete(genreId)
        .then((genre) =>
         (genre ? res.status(201).json({message:'Genre deleted from Db'}): res.status(404)
         .json({message:'Genre not found'})))
         .catch((error) => res.status(500).json({error}));

};

export default {createGenre, getOneGenre, getAllGenre, updateGenre, deleteGenre};