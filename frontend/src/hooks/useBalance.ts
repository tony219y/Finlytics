import { getTotalBalanceService } from "@/services/balance.service"
import { useQuery } from "@tanstack/react-query"

export const useGetTotalBalance = () => {
    return useQuery({
        queryKey: ['totalbalance'],
        queryFn: getTotalBalanceService,
    })
}