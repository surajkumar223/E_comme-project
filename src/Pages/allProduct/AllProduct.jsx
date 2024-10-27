
import React, { useEffect } from 'react'
import Layoutc from '../../components/layout/Layoutc'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/myState';
import { useStateContext1 } from '../../Contexapi/Content_provider';
import toast from 'react-hot-toast';

function AllProduct() {
    const { cart1, setCart1 } = useStateContext1(); 
    const navigate = useNavigate();
    const { getAllProduct } = useStateContext();
    
    const addCart = (item) => {
        // dispatch({ type: "Add", product: item });
        setCart1([...cart1, { type: "Add", product: item }]);
        console.log("item121212121212121222222222211", item)
        toast.success('Add to cart', { duration: 1000,   });
    }
    
    // Function to remove product from the cart
    const deleteCart = (item) => {
        // dispatch({ type: 'Remove', product: item });
        setCart1(prevCart1 => prevCart1.filter(cartItem => cartItem.product.id !== item.id)); // Update cart1 state on removal
        toast.error('Removed from cart', { duration: 1000,   });
    }
    useEffect(() => {
        console.log("cart1 has been updated:", cart1);
    }, [cart1]);                                           // This will log the updated cart1 whenever it changes
       

    return (
        <Layoutc>
            <div className="py-8">
                {/* eading  */}
                <div className="">
                    <h1 className="mb-5 text-2xl font-semibold text-center ">All Products</h1>
                </div>
                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-5 mx-auto lg:px-0">
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item, index) => {
                                const { id, title, price, productImageUrl } = item
                            //  Check if cart is an array and item has an id
                                const isInCart = Array.isArray(cart1) && item?.id && cart1.some(cartItem => cartItem.product.id === item.id);

                                return (
                                    <div key={index} className="w-full p-4 md:w-1/4">
                                        <div className="h-full overflow-hidden border border-gray-300 shadow-md cursor-pointer rounded-xl">
                                            <img
                                                onClick={() => navigate(`/ProductInfo/${id}`)}
                                                className="w-full lg:h-80 h-90"
                                                src={productImageUrl}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                                                </h2>
                                                <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                                                    ₹{price}
                                                </h1>
                                                <div className="flex justify-center ">
                                                    {

                                                        isInCart ? (
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
        </Layoutc>
    )
}

export default AllProduct