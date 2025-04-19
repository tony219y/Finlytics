import { Request, Response } from 'express';
import { getBalance } from '../services/summary.service';

export const Balance = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const id = parseInt(req.params.id);
        const response = await getBalance(parseInt(userId), id)
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}