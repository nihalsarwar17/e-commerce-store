import exppress from 'express';
import data from './data.js';
const app = exppress();

app.get('/api/products', (req, res) =>{
    res.send(data.products)
})

app.listen(5001, ()=>{
    console.log(`server is running at http://localhost:3000`)
})