import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth.service';
import { toast } from 'react-toastify';

function Register() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
        const res= await register(email,password);
        localStorage.setItem("token",res.access_token);
        toast.success("Registered successfully");
        navigate("/expenses");
        }catch(err:any){
          toast.error(err);
        }
    }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h2 className='text-2xl font-semibold text-center mb-4'>Register</h2>
        <form onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-80 space-y-4'>
            <input value={email}
            className='w-full border rounded p-2'
            onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
             <input
             className='w-full border rounded p-2'
             type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit"
        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
        >Register</button>
        </form>
        <p className='mt-4'>Already registered? <Link to='/login' className='font-semibold text-lg'>Login</Link></p>
    </div>
  );
}

export default Register