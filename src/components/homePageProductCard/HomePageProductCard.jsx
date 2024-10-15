import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ProductInfo from '../../Pages/productInfo/ProductInfo'
import { useStateContext } from '../../context/myState';
import Loader from '../loader/Loader';
import toast from 'react-hot-toast';
import { CartContext } from '../../Contexapi/ConteProvider';

function HomePageProductCard() {

    const { cart, dispatch } = useContext(CartContext);//cartconrext is defined in Contexapi/ConteProvider.
    // getting cart and dispatch from CartContext
    const navigate = useNavigate();
    const { loading, getAllProduct } = useStateContext();


    const addCart = (item) => {
        dispatch({ type: "Add", product: item });
        toast.success("Add to cart");
    }
    // Function to remove product from the cart
    const deleteCart = (item) => {
        dispatch({ type: 'Remove', product: item });
        toast.error('Removed from cart');
    }
            console.log("cart",cart,"dispatch",dispatch);
            
    return (
        <div className="mt-10">
            {loading && <Loader />}
            {/* Heading  */}
            <div className="">
                <h1 className="mb-5 text-2xl font-semibold text-center ">Bestselling Products</h1>
            </div>
            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">

                    <div className="flex flex-wrap -m- ">

                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item
                            
                          //  Check if cart is an array and item has an id
                                       const isInCart = Array.isArray(cart) && item?.id && cart.some(cartItem => cartItem?.id === item?.id);

                            return (
                                <div key={index} className="w-full p-5 md:w-1/4">
                                    <div className="h-full overflow-hidden border border-gray-300 shadow-md cursor-pointer rounded-xl">
                                        <img
                                            onClick={() => navigate(`/ProductInfo/${id}`)}
                                            className="w-full lg:h-80 h-90"
                                            src={productImageUrl}
                                            alt="`blog`"
                                        />
                                        <div className="p-6">
                                            <h2 className="mb-1 text-xs tracking-widest text-gray-400 font-mediu m title-font">
                                            </h2>
                                            <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                                ₹{price}
                                            </h1>
                                            <div className="flex justify-center ">
                                                {isInCart ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Remove from Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePageProductCard
