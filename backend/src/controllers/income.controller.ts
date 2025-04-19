import { Request, Response } from 'express';
import { getAllIncome, createIncome, updateListIncome, deleteListIncome } from '../services/income.service';

export const getIncome = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const response = await getAllIncome(parseInt(userId));
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const newIncome = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { amount, source, date } = req.body;
        await createIncome(parseInt(userId), amount, source, date);
        res.status(200).json({ message: "Create a new Income!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const updateIncome = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const { amount, source, date } = req.body;
        const id = parseInt(req.params.id);
        await updateListIncome(parseInt(userId), id, amount, source, date);
        res.status(200).json({ message: "Updated!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const deleteIncome = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const id = parseInt(req.params.id);
        await deleteListIncome(parseInt(userId), id)
        res.status(200).json({ message: "Deleted!" })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}