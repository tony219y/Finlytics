import { incomeSchema, IncomeSchema } from "@/lib/income.schema"
import { createInComeService, deleteIncome, getIncomeService, getTotalIncomeService, updateIncome } from "@/services/income.service";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ? Use zod check type
export const useIncomeForm = () =>
    useForm<IncomeSchema>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            source: "",
            date: "",
        },
    });
export const useCreateIncome = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createInComeService,
        onSuccess: (res: any) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["incomes"] }); // ! รีเฟรช incomes list
            onSuccessCallback?.(); // * callBack to reset form!
        },
        onError: (err: any) => {
            toast.error(err.message)
        }
    })
}

// ? get a list of in come
export type Income = {
    id: number;
    amount: number;
    source: string;
    date: string; // หรือ Date ถ้าเป็น object
};
export const useGetIncome = () => {
    return useQuery<Income[]>({
        queryKey: ['incomes'],
        queryFn: getIncomeService,
    })
}

export const useGetTotalIncome = () => {
    return useQuery({
        queryKey: ['totalincomes'],
        queryFn: getTotalIncomeService,
    })
}

export const DeleteIncome = async (id: number[]) => {
    return await deleteIncome(id)
}
// ? UpdateIncome

export const UpdateIncome = async (id: number, data: { amount: number; source: string; date: string }) => {
    console.log("UpdateIncome: ", id, data)
    return await updateIncome(id, data);
};