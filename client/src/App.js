import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {

  return (
    <BrowserRouter>
    <div>
      <header>
        <Link to="/">Amazona</Link>
      </header>
      <main>
        <Routes>
      
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/item/:slug" element={<ProductScreen/>}/>
        </Routes>
      
      </main>
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
