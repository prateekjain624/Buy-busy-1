import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Components/contexts/authContext.jsx";
import ProductProvider from "./Components/contexts/productContext.jsx";
import CartProvider from "./Components/contexts/cartContext.jsx";
import OrderProvider from "./Components/contexts/orderContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Toaster position="top-right" />
            <App />
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
