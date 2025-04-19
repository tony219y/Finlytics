import { prisma } from "../lib/prisma"

export const getAllIncome = async (userId: number) => {
    const response = await prisma.income.findMany({
        where: { userId }
    })
    return response
}
export const createIncome = async (userId: number, amount: number, source: string, date: string) => {
    const response = await prisma.income.create({
        data: {
            amount,
            source,
            date: new Date(date),
            userId
        }
    })
    return response;
}

export const updateListIncome = async (userId: number, id: number, amount: number, source: string, date: string) => {
    const response = await prisma.income.updateMany({
        where: { userId, id },
        data: {
            amount,
            source,
            date: new Date(date),
            userId
        }
    })
    return response;
}
export const deleteListIncome = async (userId: number, id: number) => {
    const response = await prisma.income.delete({
        where: { userId, id }
    })
    return response;
}
