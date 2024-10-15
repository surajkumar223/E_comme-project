import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/myState";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";

const categoryList = [
  {
      name: 'fashion'
  },
  {
      name: 'shirt'
  },
  {
      name: 'jacket'
  },
  {
      name: 'mobile'
  },
  {
      name: 'laptop'
  },
  {
      name: 'shoes'
  },
  {
      name: 'home'
  },
  {
      name: 'books'
  }
]
const AddProductPage = () => {
    const {loading, setloading} = useStateContext();
     // navigate 
     const navigate = useNavigate();
     
     // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity : 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });
    const addProductFunction = async()=>{
        if(product.title == ""|| product.price =="" || product.productImageUrl==""|| product.category==""|| product.description){
            return toast.error("all fields are required.");
        }
        setloading(true);
        try {
            const productRef = collection(fireDB, "products");
            await addDoc(productRef, product);
            toast.success("Add product successfully");
            navigate('/admin-dashboard');
            
        } catch (error) {
            // console.log(error);
            setloading(false)
            toast.error("Add product failed");  
        }
    }
  return (
      <div>
          <div className='flex items-center justify-center h-screen'>
              {/* Login Form  */}
              <div className="px-8 py-6 border border-pink-100 shadow-md login_Form bg-pink-50 rounded-xl">

                  {/* Top Heading  */}
                  <div className="mb-5">
                      <h2 className='text-2xl font-bold text-center text-pink-500 '>
                          Add Product
                      </h2>
                  </div>

                  {/* Input One  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          name="title"
                          placeholder='Product Title'
                          value={product.title}
                          onChange={(e)=>{
                            setProduct(
                                {
                                    ...product,
                                    title:e.target.value
                                })
                          }}
                          className='px-2 py-2 text-pink-300 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
                      />
                  </div>

                  {/* Input Two  */}
                  <div className="mb-3">
                      <input
                          type="number"
                          placeholder='Product Price'
                          value={product.price}
                          name="price"
                          onChange={(e)=>{
                            setProduct(
                                {
                                    ...product,
                                    price:e.target.value
                                })
                          }}
                          className='px-2 py-2 text-pink-300 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
                      />
                  </div>

                  {/* Input Three  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          placeholder='Product Image Url'
                          name="productimageurl"
                          value={product.productImageUrl}
                          onChange={(e)=>{
                            setProduct(
                                {
                                    ...product,
                                    productImageUrl:e.target.value
                                })
                          }}
                          className='px-2 py-2 text-pink-300 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50 w-96'
                      />
                  </div>

                  {/* Input Four  */}
                  <div className="mb-3">


                    
                      <select 
                      value={product.category}
                      onChange={(e)=>{
                        setProduct( {
                                ...product,
                                category:e.target.value
                            })
                      }}
                      
                      className="w-full px-1 py-2 text-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50 ">
                          <option disabled>Select Product Category</option>
                          {categoryList.map((value, index) => {
                              const { name } = value
                              return (
                                  <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                              )
                          })}
                      </select>
                  </div>

                  {/* Input Five  */}
                  <div className="mb-3">
                      <textarea name="description" placeholder="Product Description" rows="5" className="w-full px-2 py-1 text-pink-300 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50">

                      </textarea>
                  </div>

                  {/* Add Product Button  */}
                  <div className="mb-3">
                      <button
                          type='button'
                          onClick={addProductFunction}
                          className='w-full py-2 font-bold text-center text-white bg-pink-500 rounded-md hover:bg-pink-600 '
                      >
                          Add Product
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default AddProductPage;