import express from 'express';
import {addJob,deleteJob,listJobs} from '../controller/jobController.js'
import upload from '../middleware/multer.js';
import saveMail from '../controller/mailController.js'
import { adminLogin } from '../controller/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/admin/add',adminAuth,upload.fields([{name:'image1',maxCount:1}]),addJob);
userRouter.post('/admin/delete',adminAuth,deleteJob);
userRouter.get('/list',listJobs);
userRouter.post('/save',saveMail);
userRouter.post('/admin/login',adminLogin);
export default userRouter;

