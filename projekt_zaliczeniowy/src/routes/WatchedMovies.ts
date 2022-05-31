import express from 'express';
import controller from '../controllers/WatchedMovies'
import authenticateToken from '../middleware/AuthenticateJWT';

const router = express();

router.post('/create',authenticateToken, controller.createWatchedMovies);
router.get('/get/:username',authenticateToken, controller.getAllWatchedMovies);

export = router;