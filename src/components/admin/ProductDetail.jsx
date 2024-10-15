import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/myState";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

const ProductDetail = () => {
    const { loading, setloading, getAllProduct, getAllProductFunction } = useStateContext();
    const navigate = useNavigate();
    //delete function
    const deleteProduct = async (id) => {
        setloading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('product deleted successfully');
            getAllProductFunction();
            setloading(false);
        } catch (error) {
            // console.log(error)
            setloading(false)


        }
    }
    return (
        <div>
            <div className="flex items-center justify-between py-5">
                {/* text  */}
                <h1 className="text-xl font-bold text-pink-300 ">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addProduct'} >  <button className="px-5 py-2 border border-pink-100 rounded-lg bg-pink-50">Add Product</button>
                </Link>
            </div>
            {/* Loading  */}
            <div className="relative flex justify-center top-20">
                {loading && <Loader />}
            </div>
            {/* table  */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-pink-400 border border-collapse border-pink-100 sm:border-separate" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md first:border-l-0 text-slate-700 bg-slate-100 fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100"> Date</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 font-bold border-l border-pink-100 text-md fontPara first:border-l-0 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index} className="text-pink-300">
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 transition duration-300 border-t border-l border-pink-100 text-md first:border-l-0 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {date}
                                    </td>

                                    <td
                                        onClick={() => navigate(`/updateProduct/${id}`)}
                                        className="h-12 px-6 text-green-500 transition duration-300 border-t border-l border-pink-100 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                        Edit
                                    </td>
                                    <td
                                        onClick={() => deleteProduct(id)} className="h-12 px-6 text-red-500 transition duration-300 border-t border-l border-pink-100 cursor-pointer text-md first:border-l-0 stroke-slate-500 text-slate-500 ">
                                        Delete
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;   