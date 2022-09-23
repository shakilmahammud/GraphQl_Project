import { useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';

export default function Login() {
    const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);
    const [value,setValue] =useState({})
    const handleInput =(e)=>{
        setValue({...value,
            [e.target.name]:e.target.value
        })
    }
const handleSubmit =(e)=>{
    e.preventDefault()
console.log(value);
}
  return (
    <>
     <div className="container">
        <h5>Login</h5>
        <form onSubmit={handleSubmit}>
            <input type="email" 
            placeholder="Email"
            required
            onChange={handleInput}
            name="email"
            />
            <input type="password" 
            placeholder="password"
            required
            onChange={handleInput}
            name="password"
            />
        <button type="submit" className="btn #673ab7 deep-purple">Login</button>
        </form>
     </div>
    </>
  );
}
