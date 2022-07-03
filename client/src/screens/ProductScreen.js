import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST": // send AJAX req to backend
      return { ...state, loading: true };

    // when fetch is successfull:
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };

    // when fetch is failed:
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };

    // if (action.type != any of the above value), then return state
    default:
      return state;
  }
};

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = React.useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" }); // SEND REQ (SWITCH CASE)

      // if SUCCEED (SWITCH CASE)
      try {
        const result = await axios.get(`/api/products/slug/${slug}`); //AJAX req
        // const result = await axios.get(`/api/products/slug/nike-size-shirt`); //AJAX req
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        // if FAILED (SWITCH CASE)
        dispatch({ type: "FETCH_FAILED", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <LoadingBox/>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  )  : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="Primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>

    // <div>{Object.entries(product).forEach((items=>{
    //   <div>{items.name}</div>
    // }))}</div>
  );
}
