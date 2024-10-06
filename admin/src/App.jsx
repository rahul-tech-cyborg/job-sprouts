import React from 'react'
import Login from './pages/Login'
import {useState, useEffect} from 'react'
export const backendUrl = "https://job-sprouts-backend.onrender.com"
import { Routes,Route, useNavigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'

const App = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(() => {
    localStorage.setItem('token',token);
  }, [token]);
  return (
    <div>
    { token === "" ? <Login setToken={setToken}/> :
      (<>
      <div className='flex flex-col'>
        <div className='bg-slate-900 h-[50px] pl-[30px] pt-2 flex gap-5'>
          <button className='bg-slate-400 logout-btn' onClick={()=>setToken('')}>Logout</button>
          <button className='logout-btn' onClick={()=>navigate('/add')}>Add Job</button>
          <button className='logout-btn' onClick={()=>navigate('/list')}>List Jobs</button>
        </div>
        <div>
          <Routes>
            <Route path='/add' element={<Add token={token}/>} />
            <Route path='/list' element={<List token={token}/>} />
          </Routes>
        </div>
      </div>
      </>)
    }
    </div>
  )
}

export default App
