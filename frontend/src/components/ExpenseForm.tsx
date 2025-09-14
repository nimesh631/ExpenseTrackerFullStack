import React, { useState } from 'react'
import type { CreateExpenseDto } from '../services/expense.service'

interface Props {
    onSubmit: (data: CreateExpenseDto) =>void;
    initial?: CreateExpenseDto;
}

function ExpenseForm({onSubmit,initial}:Props) {
    const [form,setForm] = useState({
        title: initial?.title || "",
        amount: initial?.amount || 0,
    category: initial?.category || "",
    date: initial?.date || "",
    })

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: name === "amount" ? Number(value) : value
  });
}

    function handleSubmit  (e: React.FormEvent){
        e.preventDefault();
        onSubmit(form);
    }
    
  return (
    <form onSubmit={handleSubmit} className='m-4'>
        <input name="title" value={form.title} onChange={handleChange} placeholder='Title' type="text"  className='border m-2 p-1'/>
        <input name="amount" value={form.amount} onChange={handleChange} placeholder='Amount' type="number" className='border m-2 p-1'/>
        <input name="category" value={form.category} onChange={handleChange} placeholder='Category'type="text"  className='border m-2 p-1'/>
        <input name="date" value={form.date} onChange={handleChange} type="date" className='border m-2 p-1' />
        <button type='submit' className='bg-blue-500 p-2 text-white rounded hover:bg-blue-700'>Save</button>
    </form>
  )
}

export default ExpenseForm