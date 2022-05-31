import express from 'express';
import controller from '../controllers/Scriptwriter'
import { checkAdmin } from '../middleware/AuthenticateJWT';

const router = express();

router.post('/create',checkAdmin, controller.createScriptwriter);
router.get('/get/:scriptwriterId',checkAdmin, controller.getOneScriptwriter);
router.get('/get',checkAdmin, controller.getAllScriptwriter);
router.put('/update/:scriptwriterId',checkAdmin, controller.updateScriptwriter);
router.delete('/delete/:scriptwriterId',checkAdmin, controller.deleteScriptwriter);

export = router;