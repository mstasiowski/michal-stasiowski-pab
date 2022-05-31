import express from 'express';
import controller from '../controllers/Director'
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import { checkAdmin,authenticateToken } from '../middleware/AuthenticateJWT';

const router = express();

router.post('/create',checkAdmin,ValidateSchema(Schemas.director.create), controller.createDirector);
router.get('/get/:directorId',authenticateToken, controller.getOneDirector);
router.get('/get',authenticateToken, controller.getAllDirector);
router.put('/update/:directorId',checkAdmin, ValidateSchema(Schemas.director.update), controller.updateDirector);
router.delete('/delete/:directorId',checkAdmin, controller.deleteDirector);

export = router;