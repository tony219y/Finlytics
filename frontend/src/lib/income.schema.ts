import { z } from "zod"

// * create income
export const incomeSchema = z.object({
    amount: z.number().positive(),
    source: z.string().min(1),
    date: z.string(),
});
export type IncomeSchema = z.infer<typeof incomeSchema>;