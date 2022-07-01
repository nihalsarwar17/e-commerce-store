import React from 'react'
import { Link } from 'react-router-dom';
import data from '../data';

export default function HomeScreen() {
  return (
    <div>
          <h1>Featured Products</h1>

<div className="products">
  {data.products.map((product) => {
    return (
      <div className="items" key={product.slug}>
        <Link to={`/item/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            style={{ height: "320px" }}
          ></img>
        </Link>

        <div className="items-info">
          <Link to={`/item/${product.slug}`}>
            <p>{product.name}</p>
          </Link>

          <p>
            Price: <strong>${product.price}</strong>
          </p>
          <button>Add to cart</button>
        </div>
      </div>
    );
  })}
</div>
    </div>
  )
}
