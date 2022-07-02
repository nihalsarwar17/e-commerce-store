import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
// import data from "../data"; //=> static data

// state => current state
// action => change the prev state to new state
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST": // send AJAX req to backend
      // loading: true so we can show loading box in UI
      return { ...state, loading: true };

    // when fetch is successfull:
    case "FETCH_SUCCESS":
      // keep the prev state,
      // only update the products:
      // coming from action.payload
      // action.payload has all the products present in the API / backend
      // loading:false will stop the loading icon in UI
      return { ...state, products: action.payload, loading: false };

    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };

    // if (action.type != any of the above value), then return state
    default:
      return state;
  }
};

export default function HomeScreen() {
  // const [products, setProducts] = React.useState([])
  const [{ loading, error, products }, dispatch] = React.useReducer(
    logger(reducer),
    {
      products: [],
      loading: true, // intially fetching products from server so have to show loading box
      error: "",
    }
  );

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" }); // SEND REQ (SWITCH CASE)

      // if SUCCEED (SWITCH CASE)
      try {
        const result = await axios.get("/api/products"); //AJAX req
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        // if FAILED (SWITCH CASE)
        dispatch({ type: "FETCH_FAILED", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>

      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => {
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
          })
        )}
      </div>
    </div>
  );
}
