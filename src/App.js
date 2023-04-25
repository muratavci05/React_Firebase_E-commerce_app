import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/navbar/Signup";
import Login from "./components/navbar/Login";

import Home from "./pages/Home";
import AddProducts from "./components/AddProducts";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-products" element={<AddProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
