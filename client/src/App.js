import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function App() {

  return (
    <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <header>
      {/* <Navbar bg="dark" color="light" varient="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >Amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar> */}
        <Link to="/">Amazona</Link>
      </header>
      <main>
        {/* <Container> */}
        <Routes>
      
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/item/:slug" element={<ProductScreen/>}/>
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
