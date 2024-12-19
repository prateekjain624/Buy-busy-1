import "./App.css";

// compnent imported
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";

// react router dom imported
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAuthContext } from "./Components/contexts/authContext";
import Signup from "./Components/Signup/Signup";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  return currentUser ? children : <Navigate to="/signin" />;
};

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/cart",
          element: (
            <PrivateRoute>
              <Cart />,
            </PrivateRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <PrivateRoute>
              <Order />,
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={browserRouter} />
      </div>
    </>
  );
}

export default App;
