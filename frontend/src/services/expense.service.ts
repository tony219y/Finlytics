import api from "@/lib/axios";

export const getTotalExpenseService = async () =>{
    try {
        const response = await api.get('/summary/expense');
        return response.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message);
    }
}
