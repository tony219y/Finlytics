import { Request, response, Response } from 'express';
import { allBudget, createBudget, updateNewBudget } from '../services/budget.service';

export const getBudget = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const response = await allBudget(parseInt(userId))
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const newBudget = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { category, limit, month_year } = await req.body;
        await createBudget(parseInt(userId), category, limit, month_year)
        res.status(201).json({ message: "Create a new budget successfully!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const updateBudget = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { category } = req.params;
        const month_year = req.query.month_year as string;
        const { limit } = req.body;
        const response = await updateNewBudget(parseInt(userId), category, month_year, limit)
        res.status(200).json({ message: "Updated!", response: response, category, month_year, limit })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}