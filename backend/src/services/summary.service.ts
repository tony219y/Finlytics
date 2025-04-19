import { prisma } from "../lib/prisma"

export const getBalance = async (userId: number, id: number) => {
    const income = await prisma.income.aggregate({
        where: { userId },
        _sum: { amount: true }
      });
      
      const expense = await prisma.expense.aggregate({
        where: { userId },
        _sum: { amount: true }
      });
      const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB'
      });
      
      const totalIncome = Number(income._sum.amount ?? 0);
      const totalExpense = Number(expense._sum.amount ?? 0);
      const balance = totalIncome - totalExpense;

      return formatter.format(balance)
}