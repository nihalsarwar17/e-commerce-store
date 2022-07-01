import "./App.css";
import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href="/">amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>

        <div className="products">
          {data.products.map((product) => {
            return (
              <div className="items" key={product.slug}>

                <a href={`/item/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ height: "320px" }}
                ></img>
                </a>

                <div className="items-info">

                <a href={`/item/${product.slug}`}>
                  <p>{product.name}</p>
                  </a>

                  <p>Price: <strong>${product.price}</strong></p>
                  <button>Add to cart</button>
                </div>
                
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
