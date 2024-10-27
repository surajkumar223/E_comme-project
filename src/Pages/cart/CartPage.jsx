import { Layout, Trash } from "lucide-react";
import Layoutc from "../../components/layout/Layoutc";
import { useStateContext1 } from "../../Contexapi/Content_provider";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { addDoc, collection, Timestamp } from "firebase/firestore/lite";
import { Navigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
 
const CartPage = () => {

    const { cart1, setCart1 } = useStateContext1();

    const deleteCart = (id) => {
        setCart1(prevCart1 => prevCart1.filter(cartItem => cartItem.product.id !== id)); // Update cart1 state on removal
        toast.error('Removed from cart', { duration: 1000, });
    }

    const handleIncrement = (id) => {
        setCart1(prevCart1 =>
            prevCart1.map(item =>
                item.product.id === id ? { ...item, product: { ...item.product, quantity: item.product.quantity + 1 } } : item
            ));
    };

    const handleDecrement = (id) => {
        setCart1(prevCart1 =>
            prevCart1.map(item =>
                item.product.id === id && item.product.quantity > 1
                    ? { ...item, product: { ...item.product, quantity: item.product.quantity - 1 } }
                    : item
            ));
    };
   
        
    const cartItemTotal = cart1.map(item => item.product.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const cartTotal = cart1.map(item => item.product.price * item.product.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    useEffect(() => {
        console.log("cart1 has been updated:", cart1);
    }, [cart1]);

    // console.log("cartItemTotal", cartItemTotal);
    // console.log("cartTotal", cartTotal);
    
     // user
     const user = JSON.parse(localStorage.getItem('users'))

     console.log("user0000000000000000000", user);
     // Buy Now Function
     const [addressInfo, setAddressInfo] = useState({
         name: "",
         address: "",
         pincode: "",
         mobileNumber: "",
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
 
     const buyNowFunction = async() => {
         // validation 
         if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
             return toast.error("All Fields are required")
         } 
         
          // Order Info 
        const orderInfo = {
            cart1,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            console.log("befo");
            const orderRef = collection(fireDB, "order1");  
            console.log("after");
            await addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            console.log("i am in orderref");
            
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
            toast.error("Failed to place the order");
        }
        try {
            // const orderRef = collection(fireDB, "order");
            console.log("orderRef created successfully");
        } catch (error) {
            console.error("Error creating orderRef:", error);
        }
        
    }

    return (
        <Layoutc>
            <div className="container px-4 mx-auto max-w-7xl lg:px-0">
                <div className="max-w-2xl py-8 mx-auto lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="bg-white rounded-lg lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cart1.length > 0 ?
                                    <>
                                        {cart1.map((item, index) => {
                                            const { id, title, price, productImageUrl, quantity, category } = item.product
                                            return (
                                                <div key={index} className="">
                                                    <li className="flex py-6 sm:py-6 ">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={productImageUrl}
                                                                alt={'image'}
                                                                className="object-contain object-center w-24 h-24 rounded-md sm:h-38 sm:w-38"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-sm">
                                                                            <p className="font-semibold text-black">
                                                                                {title}
                                                                            </p>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="flex mt-1 text-sm">
                                                                        <p className="text-sm text-gray-500">{category}</p>

                                                                    </div>
                                                                    <div className="flex items-end mt-1">
                                                                        <p className="text-xs font-medium text-gray-500">
                                                                            {price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="flex mb-2">
                                                        <div className="flex min-w-24">
                                                            <button onClick={() => handleDecrement(id)} type="button" className="h-7 w-7">
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 text-center border rounded-md h-7 w-9"
                                                                value={quantity}
                                                                readOnly
                                                            />

                                                            <button onClick={() => handleIncrement(id)} type="button" className="flex items-center justify-center h-7 w-7">
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="flex ml-6 text-sm">
                                                            <button onClick={() => deleteCart(id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                                                <Trash size={12} className="text-red-500" />
                                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :
                                    <h1>Your cart is empty</h1>}
                            </ul>

                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 bg-white rounded-md lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className="px-4 py-3 text-lg font-medium text-gray-900 border-b border-gray-200 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className="px-2 py-4 space-y-1 ">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>

                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-dashed border-y ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                    {user
                                            ? (<BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={buyNowFunction}
                                            />)
                                             : 
                                            ( <Navigate to={'/login'}/>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layoutc>
    );
}

export default CartPage;