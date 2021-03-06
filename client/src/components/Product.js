import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

export default function Product(props) {
    const {product} = props

    const { state, dispatch: ctxDispatch } = useContext(Store); // coming from the Store.js
    const {
      cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) =>{
      // increase the quantity of the product in the cart, 
      // don't display number of quantity of product separately in the cart
      const existItem = cartItems.find((obj) =>obj._id===product._id) 
      const quantity = existItem ? existItem.quantity + 1 : 1;  
      const { data } = await axios.get(`api/products/${item._id}`)
      
      if (data.countInStock < quantity ) { // check if item is available in stock or not
          window.alert("Sorry, Product is out of Stock :(")
          return;
        }
        // add item to cart
        ctxDispatch({
          type: "CART_ADD_ITEM",
          payload: { ...item, quantity } 
        });
    }

  return (
    <Card>
    <Link to={`/product/${product.slug}`}>
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "320px" }}
      ></img>
    </Link>
    <Card.Body>
    <Link to={`/product/${product.slug}`}>
        <Card.Title>{product.name}</Card.Title>
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews}/>
      <Card.Text>${product.price}</Card.Text>
      {product.countInStock > 0 ? 
      <Button onClick={()=> addToCartHandler(product)}>Add to cart</Button>
    : <Button variant = "light" disabled>Out of Stock</Button>
    }
    </Card.Body>
  </Card>
  ) 
}
