
import express from 'express'

import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import conncetCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js'



//app config
const app=express();
const port=process.env.PORT||3000
connectDB()
conncetCloudinary()


//middlewares
app.use(express.json())
app.use(cors())


//apiendpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


//localhost:3000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send('HEY MY Name is Fahim')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})