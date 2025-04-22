import { z } from "zod"

// * create Expense
export const expenseSchema = z.object({
    amount: z.number().positive(),
    category: z.string().min(1),
    description: z.string(),
    date: z.string(),
});
export type ExpenseSchema = z.infer<typeof expenseSchema>;