import React from "react";
import { useParams, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import ProductDetail from "./productDetail";
import Home from "../Pages/Home";


const RouteInterceptor = () => {
    const { id } = useParams();
    const { currentResults } = useSelector((state) => state.products);
    const isLogged = useSelector((state) => state.auth.isLogged);

    if (id) {
        const foundProduct = currentResults.find((product) => product.asin === id);
        if (foundProduct) {
            return <ProductDetail detalle={foundProduct} />
        }else{
            console.log(isLogged)
            return <Home/>
        }
    }
};

export default RouteInterceptor;
