import React from "react";
import axios from 'axios'
import {useState} from 'react'
import { backendUrl } from "../App";

const Login = ({setToken}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function onSubmitHandler(event){
        try{
            event.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin/login',{email,password});
            console.log(response);
            if(response.data.success){
                setToken(response.data.token);
            }
        }
        catch(e){
            console.log(e.message);
        }
    }
  return (
    <div className="flex flex-col login login-area">
      <h1 style={{ fontSize: "30px" }} className="mx-7">
        <b>Admin Panel</b>
      </h1>
      <form
        className="flex flex-col justify-center mx-3"
        onSubmit={onSubmitHandler}
      >
        <div>
          <p>
            <b>Email</b>
          </p>
          <input
            type="text"
            placeholder="Enter email"
            className="email px-[6px]"
            onChange={(e) => {
              setEmail(e.target.value);
            }} value={email}
          />
        </div>
        <div className="h-[10px]"></div>
        <div>
          <p>
            <b>Password</b>
          </p>
          <input
            type="text"
            placeholder="Enter password"
            className="password px-[6px]"
            onChange={(e) => setPassword(e.target.value)} value={password}
          />
        </div>
        <div className="h-[10px]"></div>
        <button className="login-btn ml-[60px]">Login</button>
      </form>
    </div>
  );
};

export default Login;
