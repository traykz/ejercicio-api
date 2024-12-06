import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Login from "./Pages/Login";
import {useSelector} from "react-redux";
import ProductDetail from "./components/productDetail";
import RouteInterceptor from "./components/RouteInterceptor";


function App() {
    const isLogged = useSelector((state) => state.auth.isLogged);

   return (
      <BrowserRouter>
          {isLogged && <Navbar/>}
               <Routes>
                   <Route path="login" element={<Login />} />
                   <Route path="/" element={isLogged ? <Navigate to="/home" /> : <Login />} />
                   <Route path="home" element={isLogged ? <Home /> : <Login />} />
                   <Route path="products" element={isLogged ? <ProductList /> : <Login />} />
                   <Route path="product-detail/:id"  element={isLogged ? <RouteInterceptor component={ProductDetail} /> : <Login />} />
               </Routes>
      </BrowserRouter>
  );
}

export default App;
