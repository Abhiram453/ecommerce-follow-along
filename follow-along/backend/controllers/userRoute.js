let express=require("express");
let userRouter=express.Router();
let Errorhandler=require('../utils/errorhanler');
let asyncerror=require('../middleware/asyncErrorCatch.js');



userRouter.post("/signup",asyncerror(async(req,res,next)=>{

    const {email,password}=req.body;
    if(!email || !password){
        next(new Errorhandler("Please Provide Email And Password",400))
    }
    res.status(200).json({message:"User Created Successfully"})

      


}))





module.exports=userRouter;