import { getTotalExpenseService } from "@/services/expense.service"
import { useQuery } from "@tanstack/react-query"

export const useGetTotalExpense = () => {
    return useQuery({
        queryKey: ['totalexpense'],
        queryFn: getTotalExpenseService,
    })
}