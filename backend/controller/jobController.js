import {v2 as cloudinary} from 'cloudinary'
import jobModel from '../models/jobModel.js';

const addJob = async(req,res)=>{
    try{
        const {company_name,job_role,batch,location,income,apply_link} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const images = [image1].filter((item)=>item!==undefined)
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url;
            })
        )
        const jobData = {
            company_name,
            job_role,
            batch,
            location,
            income,
            apply_link,
            image:imageUrl,
            date:Date.now()
        }  

        const newJob = new jobModel(jobData);
        await newJob.save();

        res.json({success:true,msg:"Successfully added job"})
    }
    catch(e){
        console.log(e);
        res.json({success:false,msg:"Job not added",new_msg:e.message});
    }
}

const deleteJob = async(req,res)=>{
    try{
        const {id} = req.body;
        await jobModel.findByIdAndDelete(id);
        res.json({success:true,message:"Job Removed"})
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
    }
}

const listJobs = async(req,res)=>{
    try{
        const allJobs = await jobModel.find({});
        res.json({success:true,message:"All jobs listed",allJobs});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:e.message});
    }
}

export {addJob,deleteJob,listJobs};