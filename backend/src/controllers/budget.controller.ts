import { Request, Response } from 'express';
import 'dotenv/config'



export const getBudget = async (req: Request, res:Response) => {
    res.status(200).json({message: "dsaw"})
}
export const newBudget = async (req: Request, res:Response) => {

}
export const updateBudget = async (req: Request, res:Response) => {

}