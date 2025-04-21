import api from "@/lib/axios";

export const getTotalBalanceService = async () =>{
    try {
        const response = await api.get('/summary/balance');
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message);
    }
}
