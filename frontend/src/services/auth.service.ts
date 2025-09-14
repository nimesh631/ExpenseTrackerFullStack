import api from "../api/axios"
import type { AuthResponse } from "../types"

export const login = async (email: string, password: string): Promise<AuthResponse>=>{
   try{
    const res = await api.post("/auth/login",{email, password});
    return res.data;
   }catch(error: any){
    throw error.response?.data?.message || "something went wrong";
   }
};

export const register = async (email:string, password:string): Promise<AuthResponse> => {
 try{
    const res = await api.post("/auth/register",{email,password});
    return res.data;
} catch (error: any) {
    throw error.response?.data?.message || "Invalid credentials";
}
}