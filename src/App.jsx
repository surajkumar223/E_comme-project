import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import HomePage from "./Pages/Home/HomePage";
import NoPage from "./Pages/Nopage/NoPage";
import ProductInfo from "./Pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./Pages/cart/CartPage";
import AllProduct from "./Pages/allProduct/AllProduct";
import Signup from "./Pages/registration/Signup";
import Login from "./Pages/registration/Login";
import UserDashboard from "./Pages/user/UserDashboard";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import ProductDetail from "./components/admin/ProductDetail";
import AddProductPage from "./Pages/admin/AddProductPage";
import UpdateProductPage from "./Pages/admin/UpdateProductPage";
import { ContextProvider } from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./Pages/category/CategoryPage";




function App() {
  return (
    < ContextProvider>
      <Router>  
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/ProductInfo/:id" element={<ProductInfo/>} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage/>}/>

          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>

          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />

          <Route path="/addProduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />

          <Route path="/updateProduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />

        </Routes>
        <Toaster />
      </Router>
    </ContextProvider>
  )
}
export default App