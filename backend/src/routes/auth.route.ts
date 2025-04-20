import express from 'express'
import { registerUser, loginUser, userProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/jwt.middleware'

const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)

router.get('/profile',authMiddleware, userProfile)



export default router;