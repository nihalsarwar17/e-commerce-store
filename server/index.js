import exppress from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config(); //fetch variables from the .env file

// connecting to mongodb. call MONGODB_URI object from .env
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to Mongo Database")
}).catch((err)=>{
    console.log(err.message)
})

const app = exppress();
// mongodb API
app.use('/api/seed', seedRouter) // calls async function from seedRoutes

app.use('/api/products', productRouter)


app.listen(5001, ()=>{
    console.log(`server is running at http://localhost:3000`)
})