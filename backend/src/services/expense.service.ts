import { prisma } from "../lib/prisma"

export const getAllExpense = async (userId: number) => {
    const response = await prisma.expense.findMany({
        where: {
            userId: userId
        }
    })
    return response;
}

export const createExpense = async (userId: number, amount: string, category: string, description: string, date: string) => {
    const response = await prisma.expense.create({
        data: {
            amount,
            category,
            description,
            date: new Date(date),
            userId
        }
    })
    return response;
}

export const updateExpense = async (userId: number, id: number, amount: string, category: string, description: string, date: string) => {
    const response = await prisma.expense.updateMany({
        where: { userId, id },
        data: {
            amount,
            category,
            description,
            date: new Date(date)
        }
    })
    return response;
}

export const removeExpense = async (userId: number, id: number) => {
    const response = await prisma.expense.delete({
        where: { userId, id }
    })
    return response;
}

