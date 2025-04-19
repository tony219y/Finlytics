import { prisma } from "../lib/prisma"

export const allBudget = async (userId: number) => {
    const response = await prisma.budget.findMany({
        where: {
            userId: userId
        }
    })
    return response
}

export const createBudget = async (userId: number, category: string, limit: number, month_year: string) => {
    const existingBudget = await prisma.budget.findFirst({
        where: {
            AND: [
                { category: category },
                { month_year: month_year }
            ]
        }
    })
    if (existingBudget) throw new Error("You have a duplicate budget!");

    const response = await prisma.budget.create({
        data: {
            category: category,
            limit: limit,
            month_year: month_year,
            userId: userId
        }
    })
    return response;
}

export const updateNewBudget = async (userId: number, category: string, month_year: string, limit: number) => {
    const response = await prisma.budget.updateMany({
        where: { userId, category, month_year },
        data: { limit: limit }
    })
    return response;
}