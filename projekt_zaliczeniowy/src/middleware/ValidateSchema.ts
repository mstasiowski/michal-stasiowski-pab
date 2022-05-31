import joi, {ObjectSchema} from 'joi';
import { Request,Response, NextFunction} from 'express';
import Joi from 'joi';
import { IDirector } from '../models/Director';
import { IMovie } from '../models/Movie';



export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            console.log(error);
            return res.status(422).json({
                error
            });

        }
    };
};

export const Schemas ={
    director:{
        create:Joi.object<IDirector>({
            name: Joi.string().required(),
            surname: Joi.string().required(),

        }),
        update: Joi.object<IDirector>({
            name: Joi.string().required(),
            surname: Joi.string().required()

        })
    },
    movie:{
        create:Joi.object<IMovie>({
            title: Joi.string().required(),
            //id id must be 24 characters long
            genre: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            description: Joi.string().required(),
            production: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            director: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            script: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            premiere: Joi.string().required()
        }),
        update:Joi.object<IMovie>({
            title: Joi.string().required(),
            genre: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            description: Joi.string().required(),
            production: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            director: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            script: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            premiere: Joi.string().required()
        }),
        user:{
            
        }

    },
}