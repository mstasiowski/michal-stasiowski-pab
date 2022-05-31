import express, { NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { resourceLimits } from 'worker_threads';
import {config} from './config/config';
import directorRoutes from './routes/Director';
import movieRoutes from './routes/Movie';
import scriptwriterRoutes from './routes/Scriptwriter';
import genreRoutes from './routes/Genre';
import productionRoutes from './routes/Production';
import userRoutes from './routes/User';
import watchedRoutes from './routes/WatchedMovies'




const router = express();

export let refreshtokens:any[] = [];



//*connect to MongoDb*

mongoose.connect(config.mongo.url,{retryWrites: true, w: 'majority'})
.then(()=>{
    //connected 
    console.log('Connected to Database');
    StartServer();
})
.catch((error) =>{
    //catch error if problem with database connection
    console.log("Unable to connect: ");
    console.log(error);
})


//routes starts only if DB is connected
const StartServer = () =>
{

    //Middleware is when we use next

    router.use((req, res, next) =>{
    
        //console log request
        console.log(`METHOD: [${req.method}], URL: [${req.url}]`);

        res.on('end', () =>{
            //console log response
            console.log(`METHOD: [${req.method}], URL: [${req.url}], STATUS: [${res.status}]`);
        })
            
      next();
    })

        //some settings to read json request
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());


    //*Routes*
    router.use('/directors', directorRoutes);
    router.use('/movies', movieRoutes);
    router.use('/scriptwriters', scriptwriterRoutes);
    router.use('/genres', genreRoutes);
    router.use('/productions', productionRoutes);
    router.use('/users', userRoutes);
    router.use('/watched',watchedRoutes);
   
    

    //*Error handling
    router.use((req, res, next)=>{
        const error = new Error('Not found');
        console.log(error);

        return res.status(404).json({message: error.message});
    })

    //create a http server using router and listen on port from config folder
    http.createServer(router)
    .listen(config.server.port, () =>{console.log(`Server is running on port ${config.server.port}.`)})


}