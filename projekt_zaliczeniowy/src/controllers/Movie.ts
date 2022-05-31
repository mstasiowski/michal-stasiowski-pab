import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Movie from '../models/Movie';

const createMovie = (req: Request, res: Response, next:NextFunction) =>{

    
    const {title} = req.body;
    const {genre} = req.body;
    const {description} = req.body;
    const {production} = req.body;
    const {director} = req.body;
    const {script} = req.body;
    const {premiere} = req.body;





    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title,
        genre,
        description,
        production,
        director,
        script,
        premiere,

    });

    return movie
    .save()
    .then((movie) => res.status(200).json({movie}))
    .catch((error) => res.status(500).json({error}))

};

const getOneMovie = (req: Request, res: Response, next:NextFunction) =>{

    const movieId = req.params.movieId;

    return Movie.findById(movieId)
    .populate('genre')
    .populate('director')
    .populate('production')
    .populate('script')
    .then( (movie) => (movie ? res.status(200).json({movie}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));


};
const getAllMovie = (req: Request, res: Response, next:NextFunction) =>{

    return Movie.find()
    //populate names no id's
    .populate('genre')
    .populate('director')
    .populate('production')
    .populate('script')
    .then((movies) => res.status(200).json({movies}))
    .catch((error) => res.status(500).json({error}));

};
const updateMovie = (req: Request, res: Response, next:NextFunction) =>{

        const movieId = req.params.movieId;

        return Movie.findById(movieId)
        .then((movie) => {

            if(movie)
            {
                movie.set(req.body);

                return movie
                .save()
                .then((movie) => res.status(200).json({movie}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: 'Not found'});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteMovie = (req: Request, res: Response, next:NextFunction) =>{

        const movieId = req.params.movieId;

        return Movie.findByIdAndDelete(movieId)
        .then((movie) =>
         (movie ? res.status(201).json({message:'Movie deleted from Db'}): res.status(404)
         .json({message:'Movie not found'})))
         .catch((error) => res.status(500).json({error}));

};

export default {createMovie, getOneMovie, getAllMovie, updateMovie, deleteMovie};