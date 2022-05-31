import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Scriptwriter from '../models/Scriptwriter'

const createScriptwriter = (req: Request, res: Response, next:NextFunction) =>{

    const {name} = req.body;
    const {surname} = req.body;

    const scriptwriter = new Scriptwriter({
        _id: new mongoose.Types.ObjectId(),
        name,
        surname

    });

    return scriptwriter
    .save()
    .then((scriptwriter) => res.status(200).json({scriptwriter}))
    .catch((error) => res.status(500).json({error}))

};

const getOneScriptwriter = (req: Request, res: Response, next:NextFunction) =>{

    const scriptwriterId = req.params.scriptwriterId;

    return Scriptwriter.findById(scriptwriterId)
    .then( (scriptwriter) => (scriptwriter ? res.status(200).json({scriptwriter}): res.status(404).json({message: 'Not found'})))
    .catch((error) => res.status(500).json({error}));


};
const getAllScriptwriter = (req: Request, res: Response, next:NextFunction) =>{

    return Scriptwriter.find()
    .then((scriptwriters) => res.status(200).json({scriptwriters}))
    .catch((error) => res.status(500).json({error}));

};
const updateScriptwriter = (req: Request, res: Response, next:NextFunction) =>{

        const scriptwriterId = req.params.scriptwriterId;

        return Scriptwriter.findById(scriptwriterId)
        .then((scriptwriter) => {

            if(scriptwriter)
            {
                scriptwriter.set(req.body);

                return scriptwriter
                .save()
                .then((scriptwriter) => res.status(200).json({scriptwriter}))
                .catch((error) => res.status(500).json({error}));
            }else
            {
                res.status(404).json({message: 'Not found'});
            }

        })
        .catch((error) => res.status(500).json({error}));



};
const deleteScriptwriter = (req: Request, res: Response, next:NextFunction) =>{

        const scriptwriterId = req.params.scriptwriterId;

        return Scriptwriter.findByIdAndDelete(scriptwriterId)
        .then((scriptwriter) =>
         (scriptwriter ? res.status(201).json({message:'Scriptwriter deleted from Db'}): res.status(404)
         .json({message:'Scriptwriter not found'})))
         .catch((error) => res.status(500).json({error}));

};

export default {createScriptwriter, getOneScriptwriter, getAllScriptwriter, updateScriptwriter, deleteScriptwriter};