import axios from "axios";
const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY;

// Configuración de las opciones para el request

const API_BASE_URL = "https://real-time-amazon-data.p.rapidapi.com";
const API_HEADERS = {
    'x-rapidapi-key': 'b125abd9ebmshe161adf11f383e6p1dee53jsn051b1be7dccf',
    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
};


/**
 * Endpoint para extraer los productos de un seller especifico de la api provista
 * */
export const fetchProducts = async (query , country = "US") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/seller-products?seller_id=A02211013Q5HP3OMSZC7W&page=1&sort_by=RELEVANCE`, {
            params: { query, country },
            headers: API_HEADERS,
        });
        console.log(response.data);
        return response.data.data.seller_products || [];
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};
