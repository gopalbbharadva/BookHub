import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { DataStoreProvider } from "./contexts/DataStoreContext";
import { FilterProvider } from "./contexts/FilterContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WishListProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <CartProvider>
          <WishListProvider>
            <FilterProvider>
              <DataStoreProvider>
                <App />
              </DataStoreProvider>
            </FilterProvider>
          </WishListProvider>
        </CartProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
