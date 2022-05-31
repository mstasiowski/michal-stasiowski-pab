import express from 'express';
import controller from '../controllers/User'
import authenticateToken, { checkAdmin } from '../middleware/AuthenticateJWT';

const router = express();

router.post('/create', controller.createUser);
router.post('/login', controller.login);
router.post('/loginrefresh',authenticateToken, controller.refreshtoken);
router.delete('/logout', controller.logout);
router.get('/get/:userId',authenticateToken, controller.getOneUser);
router.get('/get',checkAdmin, controller.getAllUser);
router.put('/update/:userId',authenticateToken, controller.updateUser);
router.delete('/delete/:userId',checkAdmin, controller.deleteUser);

export = router;