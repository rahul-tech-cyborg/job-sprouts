import React from "react";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Navbar = () => {
    const [searchContent,setSearchContent] = useState('');
  const navigate = useNavigate();
  async function saveMail(){
    if(searchContent!=""){
      const response = await axios.post(backendUrl+'/api/user/save',{id:searchContent});
      console.log(response);
      if(response.data.success){
        setSearchContent('');
      }
    }
    else{
      toast.error('Field cannot be empty')
    }
  }
  return (
    <>
      <nav className="navbar flex justify-between">
        <div>
          <span className="navbar-brand" onClick={() => navigate("/")}>
            Job Sprouts
          </span>
          <div className="gap-3"></div>
          <span style={{ fontSize: "18px", color: "#1ca4c6" }}>
            {"(Software Engineering Jobs for Freshers)"}
          </span>
        </div>
        <div className="subscribe_section flex items-center gap-2 bg-white" style={{borderRadius:"30px",padding:"10px"}}>
          <input
            placeholder="Write email to get notifs"
            className="inputSubscribe p-2 border-2 border-black rounded-lg focus:outline-none focus:border-blue-500 h-[35px]" onChange={(e)=>setSearchContent(e.target.value)} value={searchContent}
          />
          <button className="subscribeButton bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300" onClick={()=>saveMail()}>
            Subscribe
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
