import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { clearSearchHistory } from '../slices/searchSlice';
 import ProductList from "./ProductList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faSearch, faSort, faTrash} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const searchHistory = useSelector((state) => state.search.searchHistory);
    const dispatch = useDispatch();
    return (

        <div className="p-8">
            <div className="inline-flex mt-6 float-end">
                <p style={{fontSize: '14px'}} className="mt-1">Búsquedas recientes: </p>
                {searchHistory.length > 0 ? (
                    <>
                        <ul className="inline-flex">
                            {searchHistory.map((term, index) => (
                                <li key={index} className="text-gray-700 ml-2 mt-1 ">
                                    <span className="bg-purple-500 px-2 text-white rounded"
                                          style={{fontSize: '15px', fontWeight: 'bold'}}> <FontAwesomeIcon
                                        color={"white"} icon={faCheck}/> {term} </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => dispatch(clearSearchHistory())}
                            className=" bg-purple-500 text-white px-4  rounded ml-2"
                        >
                            <FontAwesomeIcon color={"white"} style={{fontSize: '15px'}} icon={faTrash}/>
                        </button>
                    </>

                ) : (
                    <></>
                )}


            </div>

            <h1 className="text-2xl">Aqui podrás obtener el catálogo de productos de Amazon provistos por RapidApi!</h1>
            <ProductList/>
        </div>
    );
};

export default Home;
