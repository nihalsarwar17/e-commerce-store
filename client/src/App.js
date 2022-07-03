import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header >
      {/* <Navbar bg="dark" color="light" varient="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar> */}
        <Row>
          <Col><Link to="/">Amazona</Link></Col>
          <Col></Col>
        </Row>
        
        <Nav className="me-auto">
          <Link to="/cart" className="nav-link">
            Cart 
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {/* reduce((a,c)=> a+ c.quantity, 0) */}
                {cart.cartItems.length}
              </Badge>
            )}
          </Link>
        </Nav>
      </header>
      {/* mt-3 => distance from the navbar */}
      <main className="mt-3"> 
        {/* <Container> */}
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/product/:slug" element={<ProductScreen/>}/>
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
