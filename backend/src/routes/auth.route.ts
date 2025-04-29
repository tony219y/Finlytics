import express from 'express'
import { userProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/jwt.middleware'
import { googleAuth, googleCallback } from '../controllers/auth.google.controller';

const router = express.Router();

// router.post('/signup', registerUser);
// router.post('/login', loginUser);

// Google Auth
router.get('/google', googleAuth);
router.get('/callback/google', googleCallback);

router.get('/profile', authMiddleware, userProfile);

export default router;