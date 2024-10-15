import React from 'react'
import { useState } from "react";


const searchData = [
  {
      name: 'Fashion',
      image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
  },
  {
      name: 'Shirt',
      image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
  },
  {
      name: 'Jacket',
      image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
  },
  {
      name: 'Mobile',
      image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg'
  },
  {
      name: 'Laptop',
      image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg'
  },
  {
      name: 'Home',
      image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg'
  },
  {
      name: 'book',
      image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg'
  },
]




function Searchbar() {



     // Search State 
     const [search, setSearch] = useState("");

     // Filter Search Data
     const filterSearchData = searchData.filter((obj) => obj.name.toLowerCase().includes(search)).slice(0, 8)
  return (
    <div className="">
    {/* search input  */}
    <div className="flex justify-center input">
        <input
            type="text"
            placeholder='Search here'
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
                            <div key={index} className="px-2 py-2">
                                <div className="flex items-center gap-2">
                                    <img className="w-10" src={item.image} alt="" />
                                    {item.name}
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