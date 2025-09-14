import { useEffect,useState } from "react"
import Navbar from "../components/Navbar"
import ExpenseForm from "../components/ExpenseForm"
import type { CreateExpenseDto, Expense } from "../services/expense.service";
import { createExpense, listExpense, removeExpense } from "../services/expense.service";
import { toast } from "react-toastify";

function Expenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    async function fetchExpenses() {
        const res = await listExpense();
        setExpenses(res);
    }

   // in your component
async function addExpense(data: CreateExpenseDto) {
  try {
    await createExpense(data);
    toast.success("Expense created successfully");
    fetchExpenses(); // refresh the list
  } catch (err: any) {
    // err can be string or array from backend
    const msg =
      Array.isArray(err) ? err.join(", ") : typeof err === "string" ? err : "Something went wrong";
    toast.error(msg);
  }
}

    async function deleteExpense(id: number){
      try{
      await removeExpense(id);
      toast.success("Expense deleted successfully!");
      fetchExpenses();
      }catch(err:any){
        toast.error(err);
      }
    }

    useEffect(()=>{
      fetchExpenses();
    },[])

  return (
    <div className="max-3xl mx-auto p-6">
        <Navbar/>
        <h2 className="text-xl font-bold m-4">Your Expenses</h2>
        <ExpenseForm onSubmit={addExpense}/>
        <ul>
          {expenses.map((e)=>(
            <li key={e.id}
            className="flex justify-between items-center bg-gray-100 p-3 m-2 rounded-lg shadow"
            >
              <div className="flex item w-4xl justify-between  ">
          <p className="font-semibold text-xl">{e.title}</p>
          <p className="text-sm md:text-lg text-gray-600 p-2">
           Rs. {e.amount} | {e.category} | {e.date}
          </p>
        </div>
              <button 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={()=>deleteExpense(e.id)}>Delete</button>
            </li>

          ))}
        </ul>
    </div>
  )
}

export default Expenses