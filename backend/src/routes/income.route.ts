import express from 'express'
import { getIncome, newIncome, updateIncome, deleteIncome } from '../controllers/income.controller'
const router = express.Router();

router.get('/', getIncome)
router.post('/', newIncome)
router.put('/:id', updateIncome)
router.delete('/:id', deleteIncome)


export default router;