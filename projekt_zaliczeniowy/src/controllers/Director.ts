import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Director from "../models/Director"

const createDirector = (req: Request, res: Response, next:NextFunction) =>{

    const {name} = req.body;
    const {surname} = req.body;

    const director = new Director({
        _id: new mongoose.Types.ObjectId(),
        name,
        surname

    });

    return director
    .save()
    .then((director) => res.status(200).json({director}))
    .catch((error) => res.status(500).json({error}))

};

const getOneDirector = (req: Request, res: Response, next:NextFunction) =>{

    const directorId = req.params.directorId;

    return Director.findById(directorId)
    .then( (director) => (director ? res.status(200).json({director}): res.status(404).json({message: "Not found"})))
    .catch((error) => res.status(500).json({error}));


};
const getAllDirector = (req: Request, res: Response, next:NextFunction) =>{

    return Director.find()
    .then((directors) => res.status(200).json({directors}))
    .catch((error) => res.status(500).json({error}));

};
const updateDirector = (req: Request, res: Response, next:NextFunction) =>{

        const directorId = req.params.directorId;

        return Director.findById(directorId)
        .then((director) => {

            if(director)
            {
                director.set(req.body);

                return director
                .save()
                .then((director) => res.status(200).json({director}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: "Not found"});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteDirector = (req: Request, res: Response, next:NextFunction) =>{

        const directorId = req.params.directorId;

        return Director.findByIdAndDelete(directorId)
        .then((director) =>
         (director ? res.status(201).json({message:"Director deleted from Db"}): res.status(404)
         .json({message:"Director not found"})))
         .catch((error) => res.status(500).json({error}));

};

export default {createDirector, getOneDirector, getAllDirector, updateDirector, deleteDirector};