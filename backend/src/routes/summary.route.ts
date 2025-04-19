import express from 'express'
import { authMiddleware } from '../middlewares/jwt.middleware';
import { Balance } from '../controllers/summary.controller';

const router = express.Router();

router.get('/balance', authMiddleware, Balance)
// router.get('/monthly')
// router.get('/category-breakdown')
// router.get('/trend')
// router.get('/budget-status')

export default router;