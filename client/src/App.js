import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropDown";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddScreen from "./screens/ShippingAddScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    // user info removed from local storage after sign out
    localStorage.removeItem("userInfo");
    // shipping address info remove after sign out
    localStorage.removeItem("shippingAddress");
    // payment method info remove after sign out
    localStorage.removeItem("paymentMethod");
    // redirect user to the signin screen after sign out
    window.location.href=  '/signin';

  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* <ToastContainer position="bottom-center" limit={1}/> */}
        <header>
          {/* <Navbar bg="dark" color="light" varient="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar> */}
          <Row>
            <Col>
              <Link to="/">Amazona</Link>
            </Col>
            <Col></Col>
          </Row>

          <Nav className="me-auto">
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropDown.Item>User Profile</NavDropDown.Item>
                </LinkContainer>

                {/* <LinkContainer to="/orderhistory">
                  <NavDropDown.Item>Order History</NavDropDown.Item>
                </LinkContainer> */}

                <NavDropDown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropDown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </header>
        {/* mt-3 => distance from the navbar */}
        <main className="mt-3">
          {/* <Container> */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/shipping" element={<ShippingAddScreen/>}/>
            <Route path="/payment" element={<PaymentMethodScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>

          </Routes>
          {/* </Container> */}
        </main>

        <footer>
          <div className="text-center">All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// const obj = {
//   nested: [
//     {name: "Nihal", age: 21},
//     {name: "Madiha", age: 21},
//     {name: "Fatima", age: 2}
//   ]
// }
// console.log(obj.nested[0].name)
