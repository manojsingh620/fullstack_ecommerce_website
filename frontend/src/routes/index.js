import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { ForgotPassword } from "../pages/ForgotPassword";
import { SignUp } from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import Allusers from "../pages/Allusers";
import Products from "../pages/Products"
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Succes from "../pages/Succes";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import Allorder from "../pages/Allorder";


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
               path:"login",
               element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path:"category-product",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"success",
                element:<Succes/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            },
            {
                path:"search",
                element:<SearchProduct/>
            },
            {
                path:"order",
                element:<OrderPage/>
            },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path: "all-users",
                        element : <Allusers/>
                    },
                    {
                        path: "all-products",
                        element : <Products/>
                    },
                    {
                        path: "all-orders",
                        element : <Allorder/>
                    }
                ]
            }
        ]
    }
])

export default router