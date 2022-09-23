import { useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { SIGNUP_USER } from '../gqlOperations/mutation';

export default function SignUp() {
    const [signupUser,{data,loading,error}] =useMutation(SIGNUP_USER)
    const [value,setValue] =useState({})
    const handleInput =(e)=>{
        setValue({...value,
            [e.target.name]:e.target.value
        })
    }
const handleSubmit =(e)=>{
    e.preventDefault()
   signupUser({
    variables:{
        userNew:value,
    }
   })
}
if(loading) return <h1>Loading...</h1>
  return (
    <>
     <div className="container">
        <h5>SignUp</h5>
        {
            data
             && data.user &&
             <div className="green card-panel">{data.user.lastName} is SignUp Successfully</div>
        }
        {
            error &&
             <div className="red card-panel">{error.message}</div>
        }
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="FirstName"
            required
            onChange={handleInput}
            name="firstName"
            />
            <input type="text" 
            placeholder="lastName"
            required
            onChange={handleInput}
            name="lastName"
            />
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
        <button type="submit" className="btn #673ab7 deep-purple">SignUp</button>
        </form>
     </div>
    </>
  );
}
