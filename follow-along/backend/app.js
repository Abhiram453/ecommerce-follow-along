let express = require('express');

let app = express();
app.use(express.json());
let Errorhandler =require('./utils/errorhandler');
let errorMiddleware=require('./middleware/errorMiddleware');
let asyncerror=require('./middleware/asyncErrorCatch');
const userRouter = require('./controllers/userRoute');
const cors = require('cors');

app.use("/user",userRouter)


// app.post("/create",asyncerror(async(req,res,next)=>{
     
//         const {email,password}=req.body;
//         if(!email || !password){
//             next(new Errorhandler("Please Provide Email And Password",400))
//         }
//         res.status(200).json({message:"User Created Successfully"})     
   
// }))


app.use(cors({
    origin: "http://localhost:4534",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  
  })
  )

app.get("/test",(req,res)=>{
    res.send("Hello World");
})



app.use(errorMiddleware)
module.exports = app;