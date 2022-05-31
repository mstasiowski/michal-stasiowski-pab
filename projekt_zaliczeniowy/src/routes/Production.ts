import express from 'express';
import controller from '../controllers/Production'
import { checkAdmin } from '../middleware/AuthenticateJWT';

const router = express();

router.post('/create',checkAdmin, controller.createProduction);
router.get('/get/:productionId',checkAdmin, controller.getOneProduction);
router.get('/get',checkAdmin, controller.getAllProduction);
router.put('/update/:productionId',checkAdmin, controller.updateProduction);
router.delete('/delete/:productionId',checkAdmin, controller.deleteProduction);

export = router;