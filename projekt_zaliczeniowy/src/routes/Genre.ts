import express from 'express';
import controller from '../controllers/Genre'
import { checkAdmin, authenticateToken } from '../middleware/AuthenticateJWT';
const router = express();

router.post('/create',checkAdmin, controller.createGenre);
router.get('/get/:genreId',authenticateToken, controller.getOneGenre);
router.get('/get',authenticateToken, controller.getAllGenre);
router.put('/update/:genreId',checkAdmin, controller.updateGenre);
router.delete('/delete/:genreId',checkAdmin, controller.deleteGenre);

export = router;