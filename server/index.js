import exppress from 'express';
import data from './data.js';
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
        obj._id === req.params.id
    }))
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send( {message: "Product Not Found"} )
    }
});

app.listen(5001, ()=>{
    console.log(`server is running at http://localhost:3000`)
})