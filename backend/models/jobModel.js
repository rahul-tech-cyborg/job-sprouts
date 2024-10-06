import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company_name:{type:String,required:true},
    job_role:{type:String,required:true}, // sde, front-end etc
    batch:{type:String},
    location:{type:String},
    income:{type:String},
    apply_link:{type:String,required:true},
    image:{type:Array,required:true},
    date:{type:String}
})

const jobModel = mongoose.models.jobs || mongoose.model('jobs',jobSchema);
export default jobModel;