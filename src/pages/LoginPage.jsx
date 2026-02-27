import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/api';
import { Endpoints } from '../config/api';
import { useAuth } from '../hooks/useAuth';
export default function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const {login}=useAuth();
  const nav=useNavigate();
  const submit=async e=>{
    e.preventDefault();
    try{
      const res=await request(Endpoints.login,{method:'POST',body:JSON.stringify({email,password})});
      login(res.token);
      nav('/');
    }catch(e){setError(e.message);}
  };
  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Password"/>
        <button>Login</button>
      </form>
      <p className="text-xs text-gray-600 mt-4">Developed by Elit Bahrain. All rights reserved.</p>
    </div>
  );
}
