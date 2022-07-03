import React from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
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
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Products</h1>

      <div className="products">
        {loading ? (
          <LoadingBox/>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((items) => {
              return (
                // sm=> 12 / 6 = 2 (pics on screen)
                // md=> 12 / 4 = 3
                // lg=> 12 / 3 = 4
                <Col key={items.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={items} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}
