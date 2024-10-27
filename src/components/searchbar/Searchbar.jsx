import React from 'react'
import { useState } from "react";
import { useStateContext } from '../../context/myState';
import { useNavigate } from 'react-router-dom';

function Searchbar() {


    const { getAllProduct } = useStateContext();
     // Search State 
     const [search, setSearch] = useState("");
 console.log("this is getAllProduct",getAllProduct);
 
     // Filter Search Data
     const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8)
     const navigate = useNavigate();
  return (
    <div className="">
    {/* search input  */}
    <div className="flex justify-center input">
        <input
            type="text"
            placeholder='Search here'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='px-2 py-2 text-black placeholder-gray-400 bg-gray-200 rounded-lg outline-none w-96 lg:w-96 md:w-96'
        />
    </div>
    {/* search drop-down  */}
    <div className="flex justify-center ">
        {search && <div className="absolute z-50 block px-2 py-2 my-1 bg-gray-200 rounded-lg w-96 md:w-96 lg:w-96">
            {filterSearchData.length > 0 ?
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div key={index} className="px-2 py-2"
                                 onClick={() => navigate(`/productinfo/${item.id}`)}>
                                <div className="flex items-center gap-2">
                                    <img className="w-10" src={item.productImageUrl} alt="" />
                                    {item.title}
                                </div>
                            </div>
                        )
                    })}
                </>
                :

                <>
                    <div className="flex justify-center">
                        <img className="w-20 " src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                    </div>
                </>}
        </div>
        }
    </div>
</div>
  );
   
}

export default Searchbar