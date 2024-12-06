import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {faArrowCircleRight, faFilter, faSort, faTShirt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchProducts } from "../slices/productsSlice";
import Loader from "./../components/Loader";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {useNavigate} from "react-router-dom";

const ProductList = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { currentResults, loading, error } = useSelector((state) => state.products);

    const [products, setProducts] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    useEffect(() => {
        setProducts(currentResults);
    }, [currentResults]);

     useEffect(() => {

        console.log(currentResults)

        let filteredProducts = currentResults;

         if (searchTerm.trim()) {
            filteredProducts = filteredProducts.filter((product) =>
                product.product_title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

         if (filterTerm.trim()) {
            filteredProducts = filteredProducts.filter((product) =>
                product.product_title.toLowerCase().includes(filterTerm.toLowerCase())
            );
        }


        filteredProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseFloat(a.product_price.replace("$", "")) || 0;
            const priceB = parseFloat(b.product_price.replace("$", "")) || 0;
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

        setProducts(filteredProducts);
    }, [searchTerm, filterTerm, sortOrder, currentResults]);

    const handleProductClick = (product) => {

        navigate(`/product-detail/${product.asin}`, { state: { product } });
    };

    return (
        <div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded">
                    {loading && <Loader />}
                    <div className="flex items-center space-x-2">
                        <label><FontAwesomeIcon color={"gray"} icon={faFilter} /></label>
                        <input
                            type="text"
                            placeholder="Escribe el término para filtrar productos..."
                            className="border-2 border-gray-100 rounded-l-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-pink-200"
                            onChange={(e) => setFilterTerm(e.target.value)}
                        />
                    </div>
                </div>


                <div className="p-7 rounded space-x-2">
                    <FontAwesomeIcon color={"gray"} icon={faSort} />
                    <span style={{ fontSize: "12px" }}> Ordenar:</span>
                    <select
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        style={{ fontSize: "10px" }}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Menor a Mayor</option>
                        <option value="desc">Mayor a Menor</option>
                    </select>
                </div>
            </div>

             <div className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.asin}
                                className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="grid">
                                        <img className="object-cover" src={product.product_photo} />
                                    </div>

                                    <div className="grid col-span-3 gap-4">
                                        <h2 className="mt-10 mx-10  ml-6 text-1xl font-semibold text-justify">
                                            {product.product_title}
                                        </h2>

                                        <div className="float-start">

                                            <span className="text-white rounded-full m-10 bg-pink-500 p-2" style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>Precio: {product.product_price} USD</span>
                                            <button className="bg-blue-600 rounded p-2 pr-4 "
                                                    style={{
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold'
                                                    }}
                                                   onClick={() => handleProductClick(product)}

                                            >
                                                <FontAwesomeIcon icon={faEye}
                                                                 color={"white"}
                                                                 className="mr-1"
                                                                 size="1x"
                                                />
                                                Ver Detalle
                                            </button>


                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos. Intenta más tarde.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
