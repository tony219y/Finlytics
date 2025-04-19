import express from 'express'
import { allExpense, newExpense, putExpense, deleteExpense } from '../controllers/expense.controller';

const router = express.Router();

router.get('/', allExpense)
router.post('/', newExpense)
router.put('/:id', putExpense)
router.delete('/:id', deleteExpense)

export default router;