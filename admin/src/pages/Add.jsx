import React from 'react'
import { useState } from 'react';
import upload_area from '../assets/upload_area.png'
import { backendUrl } from '../App';
import axios from 'axios'; 

const Add = ({token}) => {
    const [image1,setImage1] = useState(false);
    const [name,setName] = useState('');
    const [jobRole,setJobRole] = useState('');
    const [batch,setBatch] = useState('');
    const [location,setLocation] = useState('');
    const [income,setIncome] = useState('');
    const [applyLink,setApplyLink] = useState('');
    async function onSubmitHandler(e){
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append('company_name',name);
            formData.append('job_role',jobRole);
            formData.append('batch',batch);
            formData.append('location',location);
            formData.append('income',income);
            formData.append('apply_link',applyLink);    
            image1 && formData.append('image1',image1); 
            const response = await axios.post(backendUrl + `/api/user/admin/add`,formData,{headers:{'token':token}})
            console.log(response.data);
            if(response.data.success){
                setImage1(null);
                setName('');
                setJobRole('');
                setBatch('');
                setLocation('');
                setIncome('');
                setApplyLink('');
            }
        }
        catch(e){
            console.log(e);
        }
    }
  return (
    <div className='ml-[30px] mt-[40px]'>
      <form onSubmit={onSubmitHandler}>
        <div className='flex gap-3'>
            <label htmlFor="image1">
                <img src={!image1 ? upload_area : URL.createObjectURL(image1)} alt="" className='w-[100px]'/>
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
            </label>
        </div>
        <div className='h-[15px]'></div>
        <div>
            <p>Company Name</p>
            <input type="text" className='w-[400px] px-[10px] general' onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div className='h-[15px]'></div>
        <div>
            <p>Job Role</p>
            <input className='w-[400px] p-[10px] general' onChange={(e)=>setJobRole(e.target.value)} value={jobRole}></input>
        </div>
        <div>
            <p>Batch</p>
            <input className='w-[400px] p-[10px] general' onChange={(e)=>setBatch(e.target.value)} value={batch}></input>
        </div>
        <div>
            <p>Location</p>
            <input className='w-[400px] p-[10px] general' onChange={(e)=>setLocation(e.target.value)} value={location}></input>
        </div>
        <div>
            <p>Income</p>
            <input className='w-[400px] p-[10px] general' onChange={(e)=>setIncome(e.target.value)} value={income}></input>
        </div>
        <div>
            <p>Apply Link</p>
            <input className='w-[400px] p-[10px] general' onChange={(e)=>setApplyLink(e.target.value)} value={applyLink}></input>
        </div>
        <br />
        <button type='submit' className='logout-btn'>Submit</button>
      </form>
      <br />
    </div>
  )
}

export default Add
