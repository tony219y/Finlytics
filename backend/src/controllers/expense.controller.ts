import { Request, Response } from 'express';
import { createExpense, getAllExpense, updateExpense, removeExpense } from '../services/expense.service';

export const getExpense = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const response = await getAllExpense(parseInt(userId))
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const newExpense = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { amount, category, description, date } = await req.body;
        await createExpense(parseInt(userId), amount, category, description, date)
        res.status(200).json({ message: "Create a expense successfully!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const putExpense = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const id = parseInt(req.params.id);
        const { amount, category, description, date } = req.body;
        await updateExpense(parseInt(userId), id, amount, category, description, date)
        res.status(200).json({ message: "Updated!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            res.status(400).json({ message: "Invalid request format" });
        }
        await removeExpense(parseInt(userId), ids)
        res.status(200).json({ message: "Deleted!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}