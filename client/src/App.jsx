import React from 'react';
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import {Routes, Route,} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";

//  import { BrowserRouter,Router, Route} from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <div>
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/products/:category" element={ <ProductList/> } />
      <Route path="/product/:id" element={ <Product/> } />
      <Route path="/cart" element={ <Cart/> } />
      <Route path="/success" element={ <Success/> } />
      <Route path="/login" element={ user ? <Home/> : <Login/> } />
      <Route path="/register" element={ user ? <Register/> : <Register/> } />
    </Routes>
    
    </div>
  );
};

export default App;