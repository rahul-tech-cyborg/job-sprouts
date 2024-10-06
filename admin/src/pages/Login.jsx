import React from "react";
import axios from 'axios';
import { useState } from 'react';
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmitHandler(event) {
        try {
            event.preventDefault();
            const response = await axios.post(`${backendUrl}/api/user/admin/login`, { email, password });
            console.log(response);
            if (response.data.success) {
                setToken(response.data.token);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            <form
                className="flex flex-col w-full max-w-sm space-y-4"
                onSubmit={onSubmitHandler}
            >
                <div>
                    <label htmlFor="email" className="block mb-1 font-bold">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 font-bold">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
