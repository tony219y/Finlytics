import express from 'express'
import authRoutes from './auth.route'
import budgetRoutes from './budget.route'
import expenseRoutes from './expense.route'
import incomeRoutes from './income.route'
import summaryRoutes from './summary.route'
import { authMiddleware } from '../middlewares/jwt.middleware'

const router = express.Router();

router.use('/auth', authRoutes)
router.use('/budget', authMiddleware, budgetRoutes)
router.use('/expenses', authMiddleware, expenseRoutes)
router.use('/income', authMiddleware, incomeRoutes)

router.use('/summary', authMiddleware, summaryRoutes)

export default router;