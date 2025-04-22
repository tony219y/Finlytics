import api from "@/lib/axios";

export const getTotalExpenseService = async () => {
    try {
        const response = await api.get('/summary/expense');
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

// * GET
export const getExpenseService = async () => {
    try {
        const response = await api.get('/expenses');
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

//* Create
export const createExpenseService = async (data: { amount: number; category: string; description: string; date: string; }) => {
    console.log(data.amount,
        data.category,
        data.description,
        data.date)
    try {
        const response = await api.post('/expenses', {
            amount: data.amount,
            category: data.category,
            description: data.description,
            date: data.date,
        });
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}

// * Update
export const updateExpense = async (id: number, data: {
    amount: number;
    category: string;
    description: string;
    date: string;
}) => {
    try {
        const response = await api.put(`/expenses/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
};

// * Delete
export const deleteExpense = async (ids: number[]) => {
    try {
        const response = await api.delete("/expenses", {
            data: { ids }
        });
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message);
    }
}