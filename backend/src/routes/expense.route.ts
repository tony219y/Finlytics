import express from 'express'
import { getExpense, newExpense, putExpense, deleteExpense } from '../controllers/expense.controller';

const router = express.Router();

router.get('/', getExpense)
router.post('/', newExpense)
router.put('/:id', putExpense)
router.delete('/', deleteExpense)

export default router;