import { expenseSchema, ExpenseSchema } from '@/lib/expense.schema';
import { createExpenseService, deleteExpense, getExpenseService, getTotalExpenseService, updateExpense } from "@/services/expense.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner';

// * GET DATA EXPENSE
export const useGetTotalExpense = () => {
    return useQuery({
        queryKey: ['totalexpense'],
        queryFn: getTotalExpenseService,
    })
}
//  ? Use zod check type
export const useExpenseForm = () =>
    useForm<ExpenseSchema>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            amount: 0,
            category: "",
            description: "",
            date: ""
        }
    });

export const useCreateExpense = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createExpenseService,
        onSuccess: (res: any) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["expenses"] }); // ! รีเฟรช expenses list
            onSuccessCallback?.(); // * callBack to reset form!
        },
        onError: (err: any) => {
            toast.error(err.message)
        }
    })
}

// ? get a list of Expense
export type expenses = {
    id: number;
    amount: number;
    category: string;
    description: string;
    date: string;
};

export const useGetExpense = () => {
    return useQuery<expenses[]>({
        queryKey: ['expenses'],
        queryFn: getExpenseService,
    })
}

// ? Update Expense
export const UpdateExpense = async (id: number, data: { amount: number; category: string; description:string; date: string }) => {
    console.log("UpdateIncome: ", id, data)
    return await updateExpense(id, data);
};

// * Delete Expense
export const DeleteExpense = async (id: number[]) => {
    return await deleteExpense(id)
}
