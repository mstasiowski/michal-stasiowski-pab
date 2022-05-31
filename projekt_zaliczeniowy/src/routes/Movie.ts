import express from 'express';
import controller from '../controllers/Movie'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import { checkAdmin, authenticateToken } from '../middleware/AuthenticateJWT';
const router = express();

router.post('/create',checkAdmin,ValidateSchema(Schemas.movie.create), controller.createMovie);
router.get('/get/:movieId',authenticateToken, controller.getOneMovie);
router.get('/get',authenticateToken, controller.getAllMovie);
router.put('/update/:movieId',checkAdmin,ValidateSchema(Schemas.movie.update), controller.updateMovie);
router.delete('/delete/:movieId',checkAdmin, controller.deleteMovie);

export = router;