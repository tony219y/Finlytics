import { Request, Response } from 'express';
import 'dotenv/config'
import { getUserProfile, login, register } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = await req.body;
        await register(username, email, password);
        res.status(201).json({ message: 'Create a new account successfully!' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.status(200).json(token);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const userProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const response = await getUserProfile(parseInt(userId));
        res.status(200).json(response)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}