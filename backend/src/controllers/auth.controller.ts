import { Request, Response } from 'express';
import 'dotenv/config'
import { getUserProfile} from '../services/auth.service';

export const userProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const response = await getUserProfile(parseInt(userId));
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}