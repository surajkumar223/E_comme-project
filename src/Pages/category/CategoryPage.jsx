import React from 'react'
import Layoutc from '../../components/layout/Layoutc'
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/myState';
import Loader from '../../components/loader/Loader';

function CategoryPage() {

    const { categoryname } = useParams();
    const { loading, getAllProduct } = useStateContext();
    const navigate = useNavigate();

    // filter product 
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
    // // console.log("ddddffffffffff", filterProduct);

    return (
        <Layoutc>
            <div className='mt-10'>
                
            <div className='justify-center file'>
                {loading && <Loader/>}
            </div>
            
                {/* Heading  */}
                <div className="">
                    <h1 className="mb-5 text-2xl font-semibold text-center first-letter:uppercase">{categoryname}</h1>
                </div>
                {loading ?
                    <div className='flex justify-center'>
                        <Loader />
                    </div>
                    :
                    <section className="text-gray-600 body-font">

                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap justify-center -m-">

                                {filterProduct.length > 0 ?

                                    <>
                                    {filterProduct.slice(0, 8).map((item, index) => {
                                        const { id, title, price, productImageUrl } = item
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
                                                            ₹{`price`}
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
                                    </>
                                    :
                                    <div>
                                        <div className="flex justify-center">
                                            <img className="mb-2 " src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className="text-xl text-black ">No {categoryname} product found</h1>
                                    </div>

                                }

                            </div>
                        </div>
                    </section>
                }

            </div>
        </Layoutc>
    )
}

export default CategoryPage