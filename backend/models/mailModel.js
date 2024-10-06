import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    email:{type:String}
})

const mailModel = mongoose.models.mails || mongoose.model('mails',mailSchema);
export default mailModel;