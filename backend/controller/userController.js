import jwt from "jsonwebtoken"

const adminLogin = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const value = email + password;
            const token = jwt.sign(value,process.env.JWT_SECRET) // token creation same as create token
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
    }
}

export {adminLogin} 