import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTShirt, faTimes, faBars, faBook, faTrash, faCheck} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {clearSearchHistory, setSearchTerm} from "../slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../slices/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchNav, setSearchNav] = useState('');
    const searchHistory = useSelector((state) => state.search.searchHistory);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = () => {
        if (searchNav.trim()) {
            dispatch(setSearchTerm(searchNav));
        } else {
            dispatch(setSearchTerm(searchNav));
        }
    }

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleLogout = ( ) => {
        dispatch(logout())
    }


    return (
        <>
            <nav className="flex justify-between items-center p-4 bg-pink-400 text-white">
                <div className="flex items-center">
                    <Link to="/">
                        <img style={{width: '200px'}}
                             src='https://assets.liverpool.com.mx/assets/images/logos/liverpool-logo.svg'
                             alt='logo'></img>

                    </Link>
                </div>
                <div className={`md:flex md:items-center ${isMenuOpen ? 'hidden ' : 'hidden'} space-x-4 md:block `}>
                    <Link to="/" className="text-2xl hover:font-bold">Home</Link>
                    <Link to="/products" className="text-2xl hover:font-bold">Products</Link>
                    <Link onClick={handleLogout} className="text-2xl hover:font-bold">Logout</Link>
                </div>

                <div className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="flex items-end mx-3 ">
                        <input
                            type="text"
                            className="p-2 rounded text-black w-auto"
                            placeholder="Búsqueda..."
                            value={searchNav}
                            onChange={(e) => setSearchNav(e.target.value)}
                            onKeyDown={handleEnter} // Trigger search on Enter key
                        />
                        <button onClick={handleSearch}
                                className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600">
                            Buscar
                        </button>
                    </div>
                </div>
                <button
                    className="text-white md:hidden"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-2xl"/>
                </button>

            </nav>

            <nav className="flex  justify-between items-center p-4 bg-pink-400 text-white">
                <div className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>

                    <div className="flex items-center space-x-5 text-center  ">
                        <Link to="/" className="hover:font-bold">Home</Link>
                        <Link to="/products" className="hover:font-bold">Products</Link>
                        <Link onClick={handleLogout} className="hover:font-bold" to={"/"}>Logout</Link>
                    </div>

                </div>
            </nav>


        </>
    )

}

export default Navbar;
