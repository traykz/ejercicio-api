import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as fetchProductsFromApi } from "./../Services/apiService";

 const loadStateFromLocalStorage = () => {
    try {
        const savedState = localStorage.getItem("productsData");
        return savedState ? JSON.parse(savedState) : { cache: { "": [] }, currentResults: [], loading: false, error: null };
    } catch (error) {
        console.error("Error loading state from localStorage:", error);
        return { cache: { "": [] }, currentResults: [], loading: false, error: null };
    }
};

 const saveStateToLocalStorage = (state) => {
    try {
        localStorage.setItem("productsData", JSON.stringify(state));
    } catch (error) {
        console.error("Error saving state to localStorage:", error);
    }
};

 export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { getState, rejectWithValue }) => {
        try {
             const { products } = getState();

             if (!products.cache[""] || products.cache[""].length === 0) {
                const results = await fetchProductsFromApi("");
                return { query: "", results };
            }

             return { query: "", results: products.cache[""] };
        } catch (error) {
            console.error("Error fetching products:", error);
            return rejectWithValue(error.message || "Error fetching products.");
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: loadStateFromLocalStorage(),
    reducers: {
        clearResults: (state) => {
            state.currentResults = [];
            state.cache = { "": [] };

             localStorage.removeItem("productsData");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { query, results } = action.payload;
                state.cache[query] = results;
                state.currentResults = results;
                state.loading = false;

                 saveStateToLocalStorage(state);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching products.";
            });
    },
});

export const { clearResults } = productsSlice.actions;
export default productsSlice.reducer;
