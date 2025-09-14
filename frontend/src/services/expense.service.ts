import api from "../api/axios";

export type Expense = {
    id:number;
    title: string;
    amount: number;
    category: string;
    date: string;
    user: {
        id: number;
        email: string;
    };
};

export interface CreateExpenseDto {
    title: string;
    amount: number;
    category: string;
    date: string;
}

export interface UpdateExpenseDto {
  title?: string;
  amount?: number;
  category?: string;
  date?: string;
}

export const listExpense = async ():Promise<Expense[]> => {
    const res = await api.get<Expense[]>("/expenses");
    return res.data;
}

export const createExpense = async (dto:CreateExpenseDto):Promise<Expense> => {
   try{
    const res = await api.post<Expense>("/expenses",dto);
    return res.data;
   }catch(error:any){
    throw error.response?.data?.message || "Something went wrong";
   }
}

export const updateExpense = async(id:number, dto:UpdateExpenseDto): Promise<Expense> => {
    const res = await api.patch<Expense>(`/expenses/${id}`,dto);
    return res.data;
}

export const removeExpense = async(id:number): Promise<{deleted: boolean}> => {
    try{
    const res = await api.delete<{deleted:boolean}>(`/expenses/${id}`);
    return res.data;
    }catch(err:any){
        throw err.response?.data?.message || "Something went wrong";
    }
}


