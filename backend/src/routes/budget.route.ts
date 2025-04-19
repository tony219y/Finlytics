import express from 'express'
import { getBudget, newBudget, updateBudget } from '../controllers/budget.controller';

const router = express.Router();

router.get('/', getBudget)
router.post('/', newBudget)
router.put('/:category', updateBudget)

export default router;