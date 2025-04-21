import api from "@/lib/axios";

export const getIncomeService = async () => {
    try {
        const response = await api.get('/income');
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}
export const getTotalIncomeService = async () => {
    try {
        const response = await api.get('/summary/income');
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

export const createInComeService = async (data: { amount: number, source: string, date: string }) => {
    try {
        const response = await api.post('/income', {
            amount: data.amount,
            source: data.source,
            date: data.date
        })
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

export const deleteIncome = async (ids: number[]) => {
    try {
        const response = await api.delete("/income", {
            data: { ids }
          });
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

export const updateIncome = async (id: number, data: {
    amount: number;
    source: string;
    date: string;
  }) => {
    try {
      const response = await api.put(`/income/${id}`, data); // ไม่มี data wrapper
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  };