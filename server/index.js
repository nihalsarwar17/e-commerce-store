import exppress from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config(); //fetch variables from the .env file

// connecting to mongodb. call MONGODB_URI object from .env
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to Mongo Database")
}).catch((err)=>{
    console.log(err.message)
})

const app = exppress();

app.get('/api/products', (req, res) =>{
    res.send(data.products)
})

// make separate individual product API
app.get('/api/products/slug/:slug', (req, res) =>{
    const product = data.products.find((obj=>{
        return obj.slug === req.params.slug
    }))
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send( {message: "Product Not Found"} )
    }
});

app.get('/api/products/:id', (req, res) =>{
    const product = data.products.find((obj=>{
        return obj._id === req.params.id
    }))
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send( {message: "ID Not Found"} )
    }
});



app.listen(5001, ()=>{
    console.log(`server is running at http://localhost:3000`)
})