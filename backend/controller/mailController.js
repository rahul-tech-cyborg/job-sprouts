import mailModel from "../models/mailModel.js";
const saveMail = async(req,res)=>{
    try{
        const {id} = req.body;
        const mailData = {
            email:id
        }  

        const newMail = new mailModel(mailData);
        await newMail.save();

        res.json({success:true,msg:"Successfully added mail"})
    }
    catch(e){
        console.log(e);
        res.json({success:false,new_msg:e.message});
    }
}
export default saveMail;