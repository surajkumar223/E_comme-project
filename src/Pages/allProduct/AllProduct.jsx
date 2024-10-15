
import React from 'react'
import Layoutc from '../../components/layout/Layoutc'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/myState';

function AllProduct() {
    const navigate = useNavigate();
    const {getAllProduct} = useStateContext();
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
                                const {  id, title, price,productImageUrl 
                                    
                                } = item
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
                                                    <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                    </button>
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