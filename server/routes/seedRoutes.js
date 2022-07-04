import express from 'express'
import Product from '../models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) =>{
    //Product is object model
    // {} means return all objects inside Product
    await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send( { createdProducts } )
})

export default seedRouter