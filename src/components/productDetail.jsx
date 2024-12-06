import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

const ProductDetail = ({detalle}) => {
     const location = useLocation();
    const [ product, setProduct ] = useState( detalle || location.state);
    const {id} = useParams();
    const navigate = useNavigate();

    console.log(product)


    if (!product) {
        return <p>No product details available.</p>;
    }



    return (
        <div className="p-8">

            <div className="min-h-screen py-6 mt-20 bg-gray-50">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        <div className="flex items-center justify-center">
                            <img src={product.product_photo} alt={product.product_title}
                                 className="object-contain h-72"/>
                        </div>

                        <div className="col-span-2">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.product_title}</h1>
                            <p className="text-2xl text-blue-600 mb-4"><strong>ASIN Product
                                Code: </strong> {product.asin}</p>
                            <p className="text-2xl text-green-600 mb-4"><strong>Price: </strong> {product.product_price}
                            </p>


                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-yellow-600">Rating ★ {product.product_star_rating}</span>
                                <span className="text-gray-600"> ({product.product_num_ratings})</span>
                            </div>

                            <p className="text-gray-600 " style={{fontSize: '12px'}}>{product.delivery}</p><br/>

                            <p className="mb-6">
                                {product.description || "Esta es una descripción condicionada!"}
                            </p>


                            <div className="space-x-4">
                                <a className="px-6 py-3 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition">
                                    Comprar
                                </a>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded hover:bg-gray-400 transition"
                                >
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;
