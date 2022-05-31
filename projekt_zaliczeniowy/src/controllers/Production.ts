import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Production from '../models/Production'

const createProduction = (req: Request, res: Response, next:NextFunction) =>{

    const {country} = req.body;
    

    const production = new Production({
        _id: new mongoose.Types.ObjectId(),
        country,
        

    });

    return production
    .save()
    .then((production) => res.status(200).json({production}))
    .catch((error) => res.status(500).json({error}))

};

const getOneProduction = (req: Request, res: Response, next:NextFunction) =>{

    const productionId = req.params.productionId;

    return Production.findById(productionId)
    .then( (production) => (production ? res.status(200).json({production}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));


};
const getAllProduction = (req: Request, res: Response, next:NextFunction) =>{

    return Production.find()
    .then((productions) => res.status(200).json({productions}))
    .catch((error) => res.status(500).json({error}));

};
const updateProduction = (req: Request, res: Response, next:NextFunction) =>{

        const productionId = req.params.productionId;

        return Production.findById(productionId)
        .then((production) => {

            if(production)
            {
                production.set(req.body);

                return production
                .save()
                .then((production) => res.status(200).json({production}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: 'Not found'});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteProduction = (req: Request, res: Response, next:NextFunction) =>{

        const productionId = req.params.productionId;

        return Production.findByIdAndDelete(productionId)
        .then((production) =>
         (production ? res.status(201).json({message:'Production deleted from Db'}): res.status(404)
         .json({message:'Production not found'})))
         .catch((error) => res.status(500).json({error}));

};

export default {createProduction, getOneProduction, getAllProduction, updateProduction, deleteProduction};